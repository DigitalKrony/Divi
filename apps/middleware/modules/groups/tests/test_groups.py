def test_create_group_success(client):
  """
  Tests that a group can be created successfully and returns the standard envelope.
  """

  payload = {
    'name': 'Backend Developers',
    'description': 'A group for discussing API architecture.',
    'location': 'Remote',
  }

  response = client.post('/groups/', json=payload)

  assert response.status_code == 201

  data = response.json()

  assert data['success'] is True
  assert data['meta']['code'] == 201

  assert data['data']['name'] == 'Backend Developers'
  assert data['data']['id'] is not None
