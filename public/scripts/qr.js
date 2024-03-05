class QRCodeComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["data", "size", "merge"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const data = encodeURIComponent(this.getAttribute("data"));
    const size = this.getAttribute("size");
    const margin = this.getAttribute("margin") || 15;

    const baseUrl = `//api.qrserver.com/v1/create-qr-code/?margin=${margin}&data=${data}&size=`;
    const img = document.createElement("img");
    img.width = size;
    img.height = size;
    img.alt = `QR Code of ${data}`;
    img.loading = "lazy";
    img.classList.add("qr-code");
    img.src = `${baseUrl}${size}x${size}`;
    img.srcset = `${baseUrl}${size * 2}x${size * 2} 2x`;

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(img);
  }
}

customElements.define("qr-code", QRCodeComponent);
