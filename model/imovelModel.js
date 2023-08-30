class ImovelModel{
    constructor(id,id_cliente,descricao,telefone,valor,endereco_id){
        this.id=id;
        this.id_cliente=id_cliente;
        this.descricao=descricao;
        this.telefone=telefone;
        this.valor=valor;
        this.endereco_id=endereco_id;
    }

}

module.exports=ImovelModel;