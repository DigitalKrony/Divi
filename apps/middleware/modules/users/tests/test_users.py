import uuid


def test_create_user_success(client):
  """
  Tests that a user can be created successfully and returns the standard envelope.
  """

  payload = {
    'uuid': str(uuid.uuid4()),  # Generate a dummy UUID for the test
    'display_name': 'testuser123',
    'password': 'pass',
    'first_name': 'Test',
    'last_name': 'User',
    'phone_number': '555-0199',
    'email_address': 'test@example.com',
    'address': None,
    'pay_accounts': [],
  }

  response = client.post('/users/', json=payload)

  assert response.status_code == 201

  data = response.json()

  assert data['success'] is True
  assert data['meta']['code'] == 201
  assert 'requestId' in data['meta']

  assert data['data']['email_address'] == 'test@example.com'
  assert data['data']['id'] is not None
