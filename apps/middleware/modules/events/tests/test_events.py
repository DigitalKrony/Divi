def test_create_event_success(client):
  """
  Tests that an event can be created using ISO-8601 datetime strings.
  """

  payload = {
    'title': 'Annual Tech Conference',
    'description': 'A deep dive into FastAPI and React.',
    'location': 'Main Hall',
    'start_date': '2026-10-15T09:00:00',
    'end_date': '2026-10-17T17:00:00',
  }

  response = client.post('/events/', json=payload)

  assert response.status_code == 201

  data = response.json()

  assert data['success'] is True
  assert data['meta']['code'] == 201

  assert data['data']['title'] == 'Annual Tech Conference'
  assert data['data']['id'] is not None
  assert '2026-10-15T09:00:00' in data['data']['start_date']


def test_delete_event_success(client):
  """
  Tests that an event can be deleted by UUID and returns the standard envelope with EventDelete.
  """
  payload = {
    'title': 'Event to Delete',
    'start_date': '2026-11-01T10:00:00',
    'end_date': '2026-11-01T12:00:00',
  }
  create_res = client.post('/events/', json=payload)
  assert create_res.status_code == 201
  event_uuid = create_res.json()['data']['uuid']

  del_res = client.delete(f'/events/{event_uuid}')
  assert del_res.status_code == 200
  del_data = del_res.json()
  assert del_data['success'] is True
  assert del_data['data']['uuid'] == event_uuid
  assert del_data['data']['id'] is not None

  # Verify 404 after deletion
  get_res = client.get(f'/events/{event_uuid}')
  assert get_res.status_code == 404

