import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { jsPDF } from 'jspdf';
import remove_icon from '../Assets/cart_cross_icon.png';
import  JsBarcode from 'jsbarcode';
import creditcards from 'creditcards';
import './Cartitems.css';
import { useNavigate } from 'react-router-dom'

export const CartItems = () => {


  const { getToTalCartAmount, all_product, cartItem, removeCartItem , userId} = useContext(ShopContext);
  const navigate = useNavigate();

 
  const [promoCode, setPromoCode] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('40 a 60 minutos');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [dataVencimento, setDataVencimento] = useState('');
  const [valor, setValor] = useState('');
  const [nomePagador, setNomePagador] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [ contatoUsario , setEmailUsuario ] = useState('');
  const [endereçoUsuario , setEndereçoUsuario ] = useState('');
  const [numeroUsuario , setNumeroUsuario ] = useState('');
  const canvasRef = useRef(null);
  const [isValido, setIsValido] = useState(null);
  const [cvv, setCvv] = useState('');
  const [erro, setErro] = useState('')
  const [numeroCartao, setNumeroCartao] = useState('');
  const [dataValidade, setDataValidade] = useState('')


  const handleNumeroCartaoChange = (event) => {


    setNumeroCartao(event.target.value);
  };

  const handleDataValidadeChange = (event) => {
    setDataValidade(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de validação e envio do formulário aqui
    // Exemplo básico de validação: 
    if (numeroCartao.trim() === '' || dataValidade.trim() === '' || cvv.trim() === '') {
      setErro('Por favor, preencha todos os campos.');
      return;
    }
    // Se todos os campos estiverem preenchidos, você pode prosseguir com o envio do formulário
    setErro('');
  };

  const handleChange = (event) => {
    setNomeUsuario(event.target.value);
  };

  const handleChangeEmail = (event) => {

    setEmailUsuario( event.target.value)

  }

  const handleChangeNumero = ( event) => {

  setNumeroUsuario( event.target.value)
  }
  
  const handleChangEndereço = ( event) => {

    setEndereçoUsuario( event.target.value)
    }


  useEffect(() => {

     generateBarcode();

  } , [])


  const paymentButton = () => {
    console.log('Processando pagamento ');
  
    // Suponha que você tenha o e-mail do usuário logado armazenado em uma variável currentUserEmail
    const currentUserEmail = 'progamin@example.com';
  
    const totalAmount = getToTalCartAmount();
    const products = all_product.filter(product => cartItem[product.id] > 0);
  
    // Verifique se o usuário está logado antes de prosseguir com a compra
    if (!currentUserEmail) {
      console.error('Nenhum usuário logado.');
      return;
    }
  
    // Crie um objeto representando os detalhes da compra
    const purchaseDetails = {
      userEmail: currentUserEmail, // Associe a compra ao e-mail do usuário logado
      items: products.map(product => ({
        id: product.id,
        name: product.name,
        image: product.image,
        category: product.category,
        new_price: product.new_price,
        quantity: cartItem[product.id]
      })),
      totalAmount: totalAmount,
      // Adicione mais detalhes da compra conforme necessário
    };
    // Valide os dados antes de armazená-los no localStorage
    if (!purchaseDetails.items.length || purchaseDetails.totalAmount <= 0) {
      console.error('Detalhes da compra inválidos.');
      return;
    }
  
    // Observe que o item está sendo armazenado no localStorage com a chave do e-mail do usuário
    localStorage.setItem(currentUserEmail, JSON.stringify(purchaseDetails));
  
    console.log('Compra registrada no localStorage:', purchaseDetails);
    alert('Compra realizada com sucesso!');
    // Navegue para a página de produtos comprados
    navigate('/produtos-comprados');
  };

 

  const handleGerarBoleto = () => {
    if (nomeUsuario.trim() === '' || contatoUsario.trim() === '' || endereçoUsuario.trim() === '' || numeroUsuario.trim() === '') {
      alert('Por favor, preencha todos os campos antes de gerar o boleto.');
      return;
  }

    // Criar um novo documento PDF
    const doc = new jsPDF('p', 'mm', 'a4');

    // Definir variáveis para coordenadas e tamanhos
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = margin;

    // Função para desenhar um retângulo
    const drawRectangle = (x, y, width, height) => {
        doc.rect(x, y, width, height);
    };

    // Função para adicionar uma seção ao boleto
    const addSection = (title, content, startX, startY, width, height, fontSize = 12) => {
        drawRectangle(startX, startY, width, height); // Chamar drawRectangle antes de adicionar a seção
        doc.setFontSize(fontSize);
        doc.setFillColor(230, 230, 230);
        doc.text(title, startX + margin / 2, startY + margin / 2);
        doc.setFontSize(10);
        doc.text(content, startX + margin / 2, startY + margin / 2 + 7);
    };

    // Função para calcular a data de vencimento
    const calcularDataVencimento = () => {
        const dataAtual = new Date();
        const dataVencimento = new Date(dataAtual);
        dataVencimento.setDate(dataAtual.getDate() + 30); // Adiciona 30 dias à data atual
        const dia = dataVencimento.getDate().toString().padStart(2, '0'); // Dia com zero à esquerda, se necessário
        const mes = (dataVencimento.getMonth() + 1).toString().padStart(2, '0'); // Mês com zero à esquerda, se necessário
        const ano = dataVencimento.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    // Função para obter a data atual no formato DD/MM/AAAA
    const obterDataAtual = () => {
        const dataAtual = new Date();
        const dia = dataAtual.getDate().toString().padStart(2, '0'); // Dia com zero à esquerda, se necessário
        const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Mês com zero à esquerda, se necessário
        const ano = dataAtual.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    // Adicionar informações do boleto
    addSection('Banco:', '001-9', margin, y, 25, 15, 16);
    addSection('Pagamento', '', margin + 25, y, pageWidth - margin * 2 - 25, 15);
    y += 15;

    addSection('Beneficiário:', 'CENTRO CULTURAL CHANNEL LTDA', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Endereço', endereçoUsuario, margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Contato', contatoUsario, margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Pagador', nomeUsuario, margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Endereço', endereçoUsuario, margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Data do Documento', obterDataAtual(), margin, y, pageWidth / 2 - margin * 0.5, 15);
    addSection('Nosso Número', '00027159750000341145', pageWidth / 2 + margin / 2, y, pageWidth / 2 - margin * 1.5, 15);
    y += 15;

    addSection('Vencimento', calcularDataVencimento(), margin, y, pageWidth / 2 - margin * 0.5, 15);

    // Adicionar itens do carrinho
    const cartItems = all_product.filter(product => cartItem[product.id] > 0);
    cartItems.forEach(product => {
        // Calcular o preço total do produto
        const totalPrice = product.new_price * cartItem[product.id];

        // Adicionar o produto abaixo do campo "Vencimento"
        addSection(`Produto ${product.name}`, '', margin, y + 15, pageWidth - margin * 2, 15);
        y += 15;

        // Adicionar o valor ao lado do campo "Vencimento"
        addSection(`R$ ${totalPrice.toFixed(2)}`, '', pageWidth / 2 + margin / 2, y - 15, pageWidth / 2 - margin * 1.5, 15);
        y += 15;
    });

    addSection('Linha Digitável', '00190.00009 02715.975005 00341.145175 7 96180000040567', margin, y, pageWidth - margin * 2, 15);
    y += 25;

    // Adicionar o código de barras
    const barcodeValue = '1234567890123'; // Substitua por um código de barras real associado ao pedido
    JsBarcode(canvasRef.current, barcodeValue, {
        format: 'CODE128',
        displayValue: false,
        width: 2,
        height: 30,
    });
    const imageData = canvasRef.current.toDataURL('image/png');
    doc.addImage(imageData, 'PNG', margin, y + 5, pageWidth - margin * 2, 25);
    doc.setFontSize(12);
    doc.text('Código de Barras', margin, y);

    y += 15;

    // Salvar o documento
    doc.save('boleto.pdf');
};
 
  const handleInputChange = (event) => {
    setPromoCode(event.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode === 'DESCONTO10') {
      setDiscount(0.1);
      alert('Código promocional aplicado com sucesso!');
    } else {
      alert('Código promocional inválido!');
    }
  };


  
  

  const sendWhatsAppMessage = () => {
    // Filtra apenas os produtos que estão no carrinho
    const cartItems = all_product.filter(product => cartItem[product.id] > 0);
    
    // Mapeia os produtos para uma lista de itens formatada, incluindo a imagem
    const itemList = cartItems.map(item => `- ${item.name}} ${item.new_price}`).join('\n');
    
    // Calcula o preço total dos itens no carrinho
    const totalPrice = cartItems.reduce((total, item) => total + (item.new_price * cartItem[item.id]), 0);
    
    // Aplica o desconto, se houver
    const discountedPrice = totalPrice - (totalPrice * discount);
    
    // Definição de outros detalhes da mensagem
    const shippingFee = 0;
    const totalAmount = parseFloat(discountedPrice) + shippingFee;
    const message = `Olá, seu pedido está a caminho!\n\nItens Pedidos:\n${itemList}\nTotal: R$ ${totalAmount}\nPrevisão de Entrega: ${deliveryTime}\nMétodo de Pagamento: ${selectedPaymentMethod}`;
    
    const url = `https://web.whatsapp.com/send?phone=${encodeURIComponent(userPhoneNumber)}&text=${encodeURIComponent(message)}`;

    setLoading(true);

    // Simulando um tempo de carregamento de 2 segundos antes de abrir a janela do WhatsApp
    setTimeout(() => {
        window.open(url, '_blank');
        setLoading(false);
    }, 2000);
}


  const selectPaymentMethod = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const validatePaymentMethod = (event) => {
    event.preventDefault();
    if (selectedPaymentMethod) {
      sendWhatsAppMessage();
    } else {
      alert('Por favor, selecione um método de pagamento antes de enviar o formulário.');
    }
  };

 
  const generateBarcode = () => {
    // Concatenar os dados do boleto para formar o código completo
    const boletoData = '001-9'; // Exemplo de dados do boleto para o código de barras
    JsBarcode(canvasRef.current, boletoData, {
      format: 'CODE128', // Formato do código de barras
      width: 2, // Largura das barras
      height: 30, // Altura das barras
    });
  };

  return (
    <div className="cartitems">
      <h1>Cart Items</h1>
      <table className="cartitems-table">
        <thead>
          <tr>
            <th>Products</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
     
        {all_product.map((product) => {
            if (cartItem[product.id] > 0) {
              return (
                <tr className="cartitems-row" key={product.id}>
                  <td><img src={product.image} className="carticon-product-icon" alt="product" /></td>
                  <td>{product.name}</td>
                  <td>{product.new_price}</td>
                  <td>{cartItem[product.id]}</td>
                  <td><img src={remove_icon} onClick={() => removeCartItem(product.id)} alt="remove" className="remove-icon" /></td>
                </tr>
              );
            }
            return null;
          })}


        </tbody>
      </table>
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div className="cartitems-total-item">
            <p>SubTotal</p>
            <p>${getToTalCartAmount()}</p>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total : </h3>
              <h3>{getToTalCartAmount()}</h3>
            </div>
          </div>
          <div className="promo-code">
          <div className="boleto-form">
          <h2> Boleto </h2>
 
          <input
    className="name-boleto"
    type="text"
    value={nomeUsuario}
    onChange={handleChange}
    placeholder="Nome"
  />
   <input
    className="email"
    type="email"
    value={contatoUsario}
    onChange={handleChangeEmail}
    placeholder="Email"
  />
   <input
    className="endereço"
    type="text"
    value={endereçoUsuario}
    onChange={handleChangEndereço}
    placeholder="Enderço completo "
  />
   <input
    className="numero"
    type="text"
    value={numeroUsuario}
    onChange={handleChangeNumero}
    placeholder="Seu Numero "
  />
  <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
  <button className='botão-boleto ' onClick={handleGerarBoleto}>Gerar Boleto</button>



  <form onSubmit={handleSubmit} className="credit-card-form">

  <h2> Cartão de Credito </h2>
      <div className="credit-card-input">
        <label htmlFor="numeroCartao" className="credit-card-label">Número do Cartão:</label>
        <input type="text" id="numeroCartao" value={numeroCartao} onChange={handleNumeroCartaoChange} placeholder="XXXX XXXX XXXX XXXX" maxLength="19" />
      </div>
      <div className="credit-card-expiry-cvv">
        <div className="credit-card-input credit-card-expiry">
          <label htmlFor="dataValidade" className="credit-card-label">Data de Validade:</label>
          <input type="text" id="dataValidade" value={dataVencimento} onChange={handleDataValidadeChange} placeholder="MM/AA" maxLength="5" />
        </div>
        <div className="credit-card-input credit-card-cvv">
          <label htmlFor="cvv" className="credit-card-label">CVV:</label>
          <input type="text" id="cvv" value={cvv} onChange={handleCvvChange} placeholder="XXX" maxLength="3" />
        </div>
      </div>
      {erro && <p className="error-message">{erro}</p>}
      <button type="submit" className="credit-card-button">Enviar</button>
    </form>

    <div className="cartitems-promocode">
          <div className="cartitems-promobox">
            <div className="left-content">
              <input type="text" placeholder="Código promocional" value={promoCode} onChange={handleInputChange} />
              <button onClick={applyPromoCode} className='botao-promo'>Aplicar</button>
            </div>
            <form onSubmit={validatePaymentMethod} className="form-button-enviar">
              <button type="button" onClick={() => selectPaymentMethod('Pix')}>Pix</button>
            
              <button className="whatsappbutton" type="button" onClick={() => sendWhatsAppMessage()}>
                {loading ? 'Enviando...' : 'Enviar via WhatsApp'}
              </button>
              <button type="button" onClick={paymentButton}>Realizar Pagamento</button>
            </form>
            {/* Modal de carregamento */}
           
          </div>
        </div>
          </div>
          </div>
        
        </div>  
       
      </div>
    </div>
  );
};