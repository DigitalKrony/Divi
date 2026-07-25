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
