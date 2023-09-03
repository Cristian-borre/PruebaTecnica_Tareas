from django.urls import path, include
from rest_framework import routers
from app.users.views import UsuarioViewSet

app_name = 'api'
router = routers.DefaultRouter()

router.register('usuario', UsuarioViewSet, basename="usuario")

urlpatterns = [ 
    path('', include(router.urls)),
]
urlpatterns += router.urls