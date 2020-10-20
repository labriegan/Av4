from config import *

class Filme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    genero = db.Column(db.String(254))
    distribuidora = db.Column(db.String(254))
    diretores = db.Column(db.String(254))    

    def __str__(self):
        return f'''
                - id: ({self.id}) 
                - nome: {self.nome} 
                - genero: {self.genero} 
                - distribuidora: {self.distribuidora}
                - diretores: {self.diretores}
                '''
    
    def json(self):
        return ({
            "id": self.id,
            "nome": self.nome,
            "genero": self.genero,
            "distribuidora": self.distribuidora,
            "diretores": self.diretores,
        })