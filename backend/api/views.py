import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Pessoa
from django.views.decorators.http import require_POST
import json

@csrf_exempt
def importar_planilha(request):
    if request.method == "POST":
        try:
            arquivo = request.FILES.get('arquivo')
            if not arquivo:
                return JsonResponse({"erro": "Nenhum arquivo enviado."}, status=400)

            df = pd.read_excel(arquivo)

            for _, row in df.iterrows():
                Pessoa.objects.create(
                    nome=row[0],
                    idade=int(row[1]),
                    email=row[2],
                    data_nascimento=row[3]
                )

            return JsonResponse({"mensagem": "Dados importados com sucesso!"}, status=201)
        except Exception as e:
            print("Erro:", e)
            return JsonResponse({"erro": str(e)}, status=400)
    return JsonResponse({"erro": "Use método POST para importar."}, status=400)


@csrf_exempt
@require_POST
def atualizar_pessoa(request, pessoa_id):
    try:
        data = json.loads(request.body)
        pessoa = Pessoa.objects.get(id=pessoa_id)
        pessoa.nome = data.get('nome', pessoa.nome)
        pessoa.idade = data.get('idade', pessoa.idade)
        pessoa.data_nascimento = data.get('data_nascimento', pessoa.data_nascimento)
        pessoa.email = data.get('email', pessoa.email)
        pessoa.save()
        return JsonResponse({'mensagem': 'Pessoa atualizada com sucesso!'})
    except Exception as e:
        return JsonResponse({'erro': str(e)}, status=400)


def listar_dados(request):
    pessoas = Pessoa.objects.all().values('id', 'nome', 'idade', 'data_nascimento', 'email')
    return JsonResponse(list(pessoas), safe=False)