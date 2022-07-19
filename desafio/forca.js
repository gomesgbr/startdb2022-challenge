class Forca {

  

  constructor(palavra){
    this.palavra = palavra.trim();
    this.estado = "aguardando chute"
    this.vidas = 6
    this.letrasChutadas = []
    this.letrasAcertadas = this.iniciarPalavra(palavra)
  }


  chutar(letra) {
    
    if(this.validarLetra(letra)){
      this.letrasChutadas.push(letra)
      this.validarChute(letra)
    }

  }

  buscarEstado() { 
    return this.estado; 
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
          vidas: this.vidas, // Quantidade de vidas restantes
          palavra: this.letrasAcertadas // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }

  validarEstado() {
    let dadosDoJogo = this.buscarDadosDoJogo()
    let checkPalavra = this.palavra.includes(dadosDoJogo.palavra.join(""))
    let checkVida = dadosDoJogo.vidas > 0


    if(!checkVida){
      this.estado = "perdeu"
    } else if(checkPalavra && checkVida){
      this.estado = "ganhou"
    } else{
      this.estado = "aguardando chute"
    }
    
  }

  validarLetra(letra){
    let dadosDoJogo = this.buscarDadosDoJogo()
    let checkLetraErrada = dadosDoJogo.letrasChutadas.includes(letra)


    if(letra.length > 1){
      return false
    }
    if(checkLetraErrada){
      return false
    }
    if(letra === ""){
      return false
    }
    return true
  }

  validarChute(letra){
    let dadosDoJogo = this.buscarDadosDoJogo()
    let palavra = this.palavra.split("")
    let checkPalavra = palavra.includes(letra)
    

    if(checkPalavra){
      palavra.forEach((e, index) =>{
        if(e === letra){
          dadosDoJogo.palavra[index] = letra
        }
      })
    }else{
      this.vidas+=-1
    }

    this.validarEstado()

  }

  iniciarPalavra(palavra){
    let p = palavra.split("")
    let arr = []
    
    p.forEach(e => {
      arr.push("_")
    });
    return arr
  }

}





module.exports = Forca;
