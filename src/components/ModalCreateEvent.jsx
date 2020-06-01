import React from "react"
import "./Modal.css"
import Banner from "../assets/banner-events.jpg"

const Modal = props => {
  const { className, modalRef, name } = props;
  const eventAdmin = ''

  return (
    <div ref={modalRef} className={`${className} modal`}>

      <img src={Banner} alt="Imagem Banner Evento" />

      <div className='eventInfo'>
        <div className='event-column-1'>
          {/* <form className="form-create-event"> */}
          <label>Administrador do Evento</label>
          <input type="text" disabled value={name} />

          {/* </form> */}

          <label>Administrador:</label>
          <br />
          <p>{name}</p>
          <br /><br />

          <label>Nome do Evento:</label>
          <br />
          <p>FIXO</p>
          <br /><br />
          <label>Jogo:</label>
          <br />
          <p>FIXO</p>
          <br /><br />
          <label>Local:</label>
          <br />
          <p>FIXO - CIDADE RUA NUMERO</p>
          <br /><br />
          <label>Número de Jogadores:</label>
          <br />
          <p>FIXO - NUMERO MÉDIO</p>
          <br /><br />
        </div>

        <div className='event-column-2'>
          <label>Descrição do Evento:</label>
          <br />
          <p>FIXO</p>
          <br /><br />
          <label>Regras:</label>
          <br />
          <p>FIXO</p>
          <br /><br />
          <label>Restringir Busca:</label>
          {/* <input type="checkbox" name="male_restriction" */}
          {/* // value={maleRestrict} */}
          {/* //  checked={this.state.address === result.ADDRESS}  */}
          {/* // onChange={setMaleRestrict(e => { e.target.value })}  */}
          {/* /> */}
          <br />


          <br /><br />
        </div>
      </div>

    </div>
  )
}

export default Modal;