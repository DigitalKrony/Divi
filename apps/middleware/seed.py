import os
import json
import models
from dateutil import parser
from sqlalchemy.exc import ProgrammingError
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import SessionLocal


def seed_database(db: Session):
  """Populates the database with initial fake data from a JSON file."""

  current_env = os.getenv('ENVIRONMENT', 'production').lower()
  if current_env != 'development':
    print(f"Server is in '{current_env}' mode. Skipping seed for safety.")
    return

  print('Wiping existing data for a clean slate...')
  try:
    db.execute(text('TRUNCATE TABLE users, groups, events, expenses CASCADE;'))
    db.commit()
  except ProgrammingError:
    db.rollback()
    print('Tables do not exist yet. Skipping truncation.')

    print('Inserting seed data...')

  base_dir = os.path.dirname(os.path.abspath(__file__))
  json_path = os.path.join(base_dir, './.mock/db.json')

  try:
    with open(json_path, 'r') as file:
      data = json.load(file)
  except FileNotFoundError:
    print(f'Error: Could not find {json_path}. Please create it first!')
    return

  user_map = {}
  group_map = {}
  event_map = {}
  expense_map = {}

  print('Seeding Users...')
  for user_info in data.get('users', []):
    u_data = user_info.copy()
    address_data = u_data.pop('address', None)
    u_data.pop('pay_accounts', [])

    new_user = models.User(**u_data)

    if address_data and hasattr(models, 'Address'):
      address_data.pop('id', None)
      new_user.address = models.Address(**address_data)

    db.add(new_user)
    db.flush()
    user_map[new_user.uuid] = new_user

  print('Seeding Groups...')
  for group_info in data.get('groups', []):
    g_data = group_info.copy()
    g_data.pop('users', [])
    g_data.pop('events', [])

    if 'created_at' in g_data:
      clean_date = str(g_data['created_at']).split(' (')[0]
      g_data['created_at'] = parser.parse(clean_date)

    if 'updated_at' in g_data:
      clean_date = str(g_data['updated_at']).split(' (')[0]
      g_data['updated_at'] = parser.parse(clean_date)

    new_group = models.Group(**g_data)
    db.add(new_group)
    db.flush()
    group_map[new_group.uuid] = new_group

  print('Seeding Events...')
  for event_info in data.get('events', []):
    e_data = event_info.copy()
    e_data.pop('users', [])
    e_data.pop('groups', [])
    e_data.pop('expenses', [])

    if 'start_date' in e_data:
      clean_date = str(e_data['start_date']).split(' (')[0]
      e_data['start_date'] = parser.parse(clean_date)

    if 'end_date' in e_data:
      clean_date = str(e_data['end_date']).split(' (')[0]
      e_data['end_date'] = parser.parse(clean_date)

    new_event = models.Event(**e_data)
    db.add(new_event)
    db.flush()
    event_map[new_event.uuid] = new_event

  print('Seeding Expenses...')
  for expense_info in data.get('expenses', []):
    exp_data = expense_info.copy()
    exp_data.pop('participants', [])
    exp_data.pop('owner', None)
    exp_data.pop('event', None)

    if exp_data.get('date'):
      clean_date = str(exp_data['date']).split(' (')[0]
      exp_data['date'] = parser.parse(clean_date)

    if exp_data.get('created_at'):
      clean_date = str(exp_data['created_at']).split(' (')[0]
      exp_data['created_at'] = parser.parse(clean_date)

    if exp_data.get('updated_at'):
      clean_date = str(exp_data['updated_at']).split(' (')[0]
      exp_data['updated_at'] = parser.parse(clean_date)

    raw_amount = exp_data.get('amount')
    try:
      exp_data['amount'] = float(raw_amount) if raw_amount is not None else 25.00
    except ValueError:
      exp_data['amount'] = 25.00

    new_expense = models.Expense(**exp_data)
    db.add(new_expense)
    db.flush()
    expense_map[new_expense.uuid] = new_expense

  print('Linking Relationships...')

  for group_info in data.get('groups', []):
    group = group_map.get(group_info.get('uuid'))
    if group:
      for u_uuid in group_info.get('users', []):
        if u_uuid in user_map and user_map[u_uuid] not in group.users:
          group.users.append(user_map[u_uuid])

  for event_info in data.get('events', []):
    event = event_map.get(event_info.get('uuid'))
    if event:
      for u_uuid in event_info.get('users', []):
        if u_uuid in user_map and user_map[u_uuid] not in event.users:
          event.users.append(user_map[u_uuid])
      for g_uuid in event_info.get('groups', []):
        if g_uuid in group_map and group_map[g_uuid] not in event.groups:
          event.groups.append(group_map[g_uuid])

  for expense_info in data.get('expenses', []):
    expense = expense_map.get(expense_info.get('uuid'))
    if expense:
      owner_uuid = expense_info.get('owner')
      if owner_uuid in user_map:
        expense.owner = user_map[owner_uuid]

      event_uuid = expense_info.get('event')
      if event_uuid in event_map:
        expense.event = event_map[event_uuid]

      for p_uuid in expense_info.get('participants', []):
        if p_uuid in user_map and user_map[p_uuid] not in expense.participants:
          expense.participants.append(user_map[p_uuid])

  db.commit()
  print('Database successfully seeded from db.json!')


if __name__ == '__main__':
  db = SessionLocal()
  try:
    seed_database(db)
  finally:
    db.close()
