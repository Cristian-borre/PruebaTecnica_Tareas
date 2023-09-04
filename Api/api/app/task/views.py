from .models import TaskModel
from .serializer import TaskSerializer, TaskUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets

# Create your views here.

class TaskViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = TaskModel.objects.all()        
    serializer_class = TaskSerializer
    model = TaskModel
    permission_classes = [IsAuthenticated]

    def list(self,request, **kwargs):
        try:
            task = list(TaskModel.objects.filter().values())
            if len(task) > 0:
                responseData = {'message':'Tareas listadas','data': task}
            else:
                responseData = {'message':'Tareas no listadas'}
            return Response(responseData)
        except Exception as ex:
            responseData = 'excep ' + str(ex)
            return Response(responseData)  
    
    def post(self,request,format=None):
        try:
            serializer = TaskSerializer(data = request.data, context={'request': request})
            if serializer.is_valid():
                tarea = TaskModel()
                tarea.titulo = request.data['titulo']
                tarea.descripcion = request.data['descripcion']
                tarea.usuario_id = request.data['usuario_id']
                tarea.save()
                message = {'message':'Tarea creado','data':serializer.data}
            else:
                message = {'error':'Tarea no creado'}
            return Response(message)  
        except Exception as ex:
            responseData = 'excep ' + str(ex)
            return Response(responseData)

    def put(self,request,**kwargs):
        try:
            task = list(TaskModel.objects.filter(id=kwargs['pk']).values())
            if len(task) > 0:
                task = TaskModel.objects.get(id=kwargs['pk'])
                task.estado = True
                task.save()
                datos = {'message':'Tarea terminada'}
            else:
                datos = {'message':'Tarea no encontrada'}
            return Response(datos)
        except Exception as ex:
            responseData = 'excep ' + str(ex)
            return Response(responseData)