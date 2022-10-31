const template = document.createElement('template');
template.innerHTML = `
<style>
  .employee-card {
    font-family: sans-serif;
    background: #f4f6f7;
    width: 250px;
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 10px;
    border: 1px solid red;
  }

</style>
<div class="employee-card">
  <img width="150"/>
  <div>
    <h3 class="border"></h3>
    <div class="details p-3">
      <p><slot name="id"/></p>
      <p><slot name="job title"/></p>
      <p><slot name="email"/></p>
      <p><slot name="phone"/></p>
    </div>
  </div>
</div>`;

class EmployeeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
  }

  connectedCallback() {
    this.h3 = this.getAttribute("name")
    this.render();
  }

  render() {
    this.h3;
  }
}
window.customElements.define('employee-card', EmployeeCard);