from rest_framework import serializers
from models import Pessoa

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = ['id','nome','idade','email', 'data_nascimento']