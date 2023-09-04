from rest_framework import serializers
from .models import UsuarioModel
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsuarioModel
        fields = ['id','nombre','apellido','email','password','fecha']
        extra_kwargs = {
            'password': {'write_only':True}  # Indica que el campo de contraseña solo se usará para escribir (crear/actualizar)
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None) # Extrae la contraseña del diccionario validado
        instance = self.Meta.model(**validated_data)   # Crea una instancia del modelo UsuarioModel con los datos validados
        if password is not None:
            instance.password = make_password(password) # Hashea y establece la contraseña
        instance.save() # Guarda la instancia en la base de datos
        return instance # Devuelve la instancia creada
    
class UsuarioUpdateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsuarioModel
        fields = ['id','nombre','apellido','email','password']

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)  # Extrae la contraseña del diccionario validado
        if password:
            instance.password = make_password(password) # Hashea y establece la contraseña
        return super().update(instance, validated_data)# Llama al método `update` de la clase base y actualiza la instancia