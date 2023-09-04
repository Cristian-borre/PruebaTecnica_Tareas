from rest_framework import serializers
from .models import TaskModel
from app.users.models import UsuarioModel

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    usuario_id = serializers.PrimaryKeyRelatedField(queryset=UsuarioModel.objects.all())
    usuario = serializers.CharField(source='usuario.usuario',read_only=True)
    class Meta:
        model = TaskModel
        fields = ['id', 'titulo','descripcion','estado','fecha','usuario_id','usuario']

class TaskUpdateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TaskModel
        fields = ['id', 'titulo','descripcion','estado']