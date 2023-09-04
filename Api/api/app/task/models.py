from django.db import models
from app.users.models import UsuarioModel

# Create your models here.

class TaskModel(models.Model):

    id = models.AutoField(primary_key=True)
    titulo = models.CharField(db_column='titulo', max_length=100)
    descripcion = models.CharField(db_column='descripcion', max_length=300)
    estado = models.BooleanField(db_column='estado',default=False)
    fecha = models.DateTimeField(db_column='fecha', auto_now_add=True)
    usuario = models.ForeignKey(UsuarioModel,db_column='usuario',on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'task'
        verbose_name = 'task'
        verbose_name_plural = 'tasks'