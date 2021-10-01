import '../styles/pages/main-page.css'

export default function Evaluation() {
  return (
    <div id="page-container">
      <h1>Dados</h1>
      <form>
        <div>
          <p>Nome</p>
          <input type="text" />
          <p>Critérios</p>
          <select>
            <option value="1">Pacer</option>
            <option value="2">Critério Simples</option>
          </select>
          <p>Manter Anonimato?</p>
          <input type="radio" value="1" name="anonymous" />
          <label>Sim</label>
          <input type="radio" value="2" name="anonymous" checked />
          <label>Não</label>
        </div>
        <button className="confirm-button" type="submit">
          Próximo
        </button>
      </form>
    </div>
  )
}
