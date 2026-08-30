from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class UserModelTests(APITestCase):
    def test_create_user(self):
        user = User.objects.create_user(username='testuser', password='parola123')
        self.assertEqual(user.username, 'testuser')
        self.assertTrue(user.check_password('parola123'))


class RegisterEndpointTests(APITestCase):
    def test_register_creates_user(self):
        url = reverse('register')
        data = {'username': 'newuser', 'email': 'new@test.com', 'password': 'parola123'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_register_password_not_in_response(self):
        url = reverse('register')
        data = {'username': 'newuser2', 'email': 'new2@test.com', 'password': 'parola123'}
        response = self.client.post(url, data)
        self.assertNotIn('password', response.data)


class TokenEndpointTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='loginuser', password='parola123')

    def test_login_returns_tokens(self):
        url = reverse('token_obtain_pair')
        data = {'username': 'loginuser', 'password': 'parola123'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_wrong_password_fails(self):
        url = reverse('token_obtain_pair')
        data = {'username': 'loginuser', 'password': 'gresita'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)