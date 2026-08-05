from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db
from modules.events import router as events_router
from modules.events import schemas as event_schemas
from modules.expenses import router as expenses_router
from modules.expenses import schemas as expense_schemas
from modules.groups import router as groups_router
from modules.groups import schemas as group_schemas
from modules.users import router as users_router
from modules.users import schemas as user_schemas

shared_namespace = {
  'UserBase': user_schemas.UserBase,
  'GroupBase': group_schemas.GroupBase,
  'EventBase': event_schemas.EventBase,
  'ExpenseBase': expense_schemas.ExpenseBase,
}

user_schemas.UserBase.model_rebuild(_types_namespace=shared_namespace)
user_schemas.UserCreate.model_rebuild(_types_namespace=shared_namespace)
user_schemas.UserResponse.model_rebuild(_types_namespace=shared_namespace)

group_schemas.GroupBase.model_rebuild(_types_namespace=shared_namespace)
group_schemas.GroupCreate.model_rebuild(_types_namespace=shared_namespace)
group_schemas.GroupResponse.model_rebuild(_types_namespace=shared_namespace)

event_schemas.EventBase.model_rebuild(_types_namespace=shared_namespace)
event_schemas.EventCreate.model_rebuild(_types_namespace=shared_namespace)
event_schemas.EventResponse.model_rebuild(_types_namespace=shared_namespace)

expense_schemas.ExpenseBase.model_rebuild(_types_namespace=shared_namespace)
expense_schemas.ExpenseCreate.model_rebuild(_types_namespace=shared_namespace)
expense_schemas.ExpenseResponse.model_rebuild(_types_namespace=shared_namespace)

app = FastAPI(
  title='Divi App v0.1.2',
  root_path='/api',
  openapi_url='/openapi.json',
)

app.add_middleware(
  CORSMiddleware,
  allow_origin_regex=r'^http://(localhost|127\.0\.0\.1)(:[0-9]+)?$',
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*'],
)


@app.get('/health', tags=['Health'])
def health_check(db: Session = Depends(get_db)):
  """
  Uptime monitoring endpoint.
  If this returns 200 OK, the server and Uvicorn are running!
  """

  try:
    db.execute(text('SELECT 1'))
    return {'status': 'healthy', 'message': 'API is up and running'}
  except Exception:
    raise HTTPException(status_code=503, detail='Database connection failed')


app.include_router(users_router.router)
app.include_router(groups_router.router)
app.include_router(events_router.router)
app.include_router(expenses_router.router)

if __name__ == '__main__':
  swagger_json = app.openapi()

  with open('./../../packages/divi-docs/src/swagger.json', 'w') as f:
    json.dump(swagger_json, f, indent=4)

  print('Successfully generated swagger.json file!')
