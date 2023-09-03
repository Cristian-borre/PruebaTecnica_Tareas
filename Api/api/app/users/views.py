from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import viewsets
from .models import UsuarioModel
from .serializer import UsuarioSerializer,UsuarioUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

# Create your views here.

class UsuarioViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = UsuarioModel.objects.all()        
    serializer_class = UsuarioSerializer
    model = UsuarioModel
    permission_classes = [IsAuthenticated]

    def list(self,request):
        try:
            usuario = list(UsuarioModel.objects.filter().values())
            if len(usuario) > 0:
                responseData = {'message':'Usuarios listados','data': usuario}
            else:
                responseData = {'message':'Usuarios no listados'}
            return Response(responseData)
        except Exception as ex:
            responseData = 'excep ' + str(ex)
            return Response(responseData)

    def post(self,request,format=None):
        try:
            serializer = UsuarioSerializer(data = request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                message = {'message':'Usuario creado','data':serializer.data}
            else:
                message = {'message':'Usuario no creado'}
            return Response(message)  
        except Exception as ex:
            responseData = 'excep ' + str(ex)
            return Response(responseData)  
    
    def put(self,request,**kwargs):
        try:
            usuario = UsuarioModel.objects.filter(id=kwargs['pk']).first()
            if usuario:
                serializer = UsuarioUpdateSerializer(usuario, data = request.data, context={'request': request},partial=False)
                if serializer.is_valid():
                    serializer.save()
                    datos = {'message':'Usuario actualizado','data':serializer.data}
                else:
                    datos = {'message':'Usuario no actualizado'}
            else:
                datos = {'message':'Usuario no encontrado'}
            return Response(datos)
        except Exception as ex:
            responseData = 'excep ' +str(ex)
            return Response(responseData)

class LoginViewSet(ObtainAuthToken):

    def post(self,request,**kwargs):
        try:
            serializer = self.serializer_class(data=request.data,context={'request': request})
            if serializer.is_valid():
                user = serializer.validated_data['user']
                token, created = Token.objects.get_or_create(user=user)
                if serializer.is_valid():
                    responseData = {'message':'Usuario encontrado',
                                    'Datos': { 'token': token.key , 'user_id' : user.pk, 'user_name': user.nombre+' '+user.apellido, 'user_email':user.email }}
                else:
                    responseData = {'errors','Contraseña incorrecta'}
                return Response(responseData)
            else:
                responseData = {'error':'Usuario no encontrado'}
                return Response(responseData, status=200)
        except Exception as ex:
            responseData = 'excep ' +str(ex)
            return Response(responseData)