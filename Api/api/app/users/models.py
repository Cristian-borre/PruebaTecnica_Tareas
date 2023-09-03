from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class UsuarioModel(AbstractUser):

    id = models.AutoField(primary_key=True)
    nombre = models.CharField(db_column='nombre', max_length=50)
    apellido = models.CharField(db_column='apellido', max_length=50)
    email = models.CharField(db_column='email', max_length=100, unique=True)
    password = models.CharField(db_column='password', max_length=100)
    fecha = models.DateTimeField(db_column='fecha', auto_now_add=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        managed = True
        db_table = 'Usuario'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'