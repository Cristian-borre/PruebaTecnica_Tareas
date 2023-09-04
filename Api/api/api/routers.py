from django.urls import path, include
from rest_framework import routers
from app.users.views import UsuarioViewSet,CreateUsuarioViewSet
from app.task.views import TaskViewSet

app_name = 'api'
router = routers.DefaultRouter()

router.register('usuario', UsuarioViewSet, basename="usuario")
router.register('create-usuario', CreateUsuarioViewSet, basename="usuario")
router.register('tareas', TaskViewSet, basename="task")
router.register('tareas/<int:usuario>', TaskViewSet, basename="task")

urlpatterns = [ 
    path('', include(router.urls)),
]
urlpatterns += router.urls