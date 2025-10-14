from django.urls import path
from django.contrib import admin
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('importar-planilha/', views.importar_planilha, name='importar_planilha'),
    path('dados/', views.listar_dados, name='listar_dados'),
    path('atualizar-pessoa/<int:pessoa_id>/', views.atualizar_pessoa, name='atualizar_pessoa'),
]