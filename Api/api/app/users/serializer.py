from rest_framework import serializers
from .models import UsuarioModel
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsuarioModel
        fields = ['id','nombre','apellido','email','password','fecha']
        extra_kwargs = {
            'password': {'write_only':True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.password = make_password(password)
        instance.save()
        return instance
    
class UsuarioUpdateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsuarioModel
        fields = ['id','nombre','apellido','email','password']

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.password = make_password(password)
        return super().update(instance, validated_data)