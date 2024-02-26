import React, { useContext, useState, useRef } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import QRCode from 'qrcode.react'; 
import "./Cartitems.css";

export const CartItems = () => {
    const { getToTalCartAmount, all_product, cartItem, removeCartItem } = useContext(ShopContext);
    const [promoCode, setPromoCode] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('40 a 60 minutos');
    const qrCodeRef = useRef(null); 
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [discount, setDiscount] = useState(0);

    const handleInputChange = (event) => {
        setPromoCode(event.target.value);
    }

    const applyPromoCode = () => {
        // Verifica se o código promocional é válido
        // Por exemplo, poderia ser uma chamada a uma API para validar o código
        if (promoCode === 'DESCONTO10') {
            // Se o código for válido, aplica um desconto de 10%
            setDiscount(0.1);
            alert('Código promocional aplicado com sucesso!');
        } else {
            alert('Código promocional inválido!');
        }
    }

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
    }

    const validatePaymentMethod = (event) => {
        event.preventDefault(); // Impede o envio do formulário
        
        if (selectedPaymentMethod) {
            sendWhatsAppMessage(); // Chama a função para enviar a mensagem pelo WhatsApp
        } else {
            alert("Por favor, selecione um método de pagamento antes de enviar o formulário.");
        }
    }

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className='cartitems'>
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
                                    <td>
                                        <img src={product.image} className='carticon-product-icon' alt='product'/>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.new_price}</td>
                                    <td>{cartItem[product.id]}</td>
                                    <td>
                                        <img 
                                            src={remove_icon}  
                                            onClick={() => removeCartItem(product.id)} 
                                            alt='remove'
                                            className='remove-icon'
                                        />
                                    </td>
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
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>         
                        <hr/> 
                        <div className="cartitems-total-item">
                            <h3>Total : </h3>
                            <h3>${getToTalCartAmount()}</h3>
                        </div>
                        <div>
                            <div className='promo-code'>
                                
                            </div>
                          
                        </div>   
                    </div>
                    <div className="cartitems-promocode">
                        <div className="cartitems-promobox">
                            <div className="left-content">
                            <input type="text" placeholder="Código promocional" value={promoCode} onChange={handleInputChange} />
                                <button onClick={applyPromoCode}>Aplicar</button>
                            </div>
                            <form onSubmit={validatePaymentMethod} className='form-button-enviar'>
                                <button type="button" onClick={() => selectPaymentMethod('Pix')}>Pagar com Pix</button>
                                <button type="button" onClick={() => selectPaymentMethod('Cartão de Crédito')}>Pagar com Cartão de Crédito</button>
                                <button type="button" onClick={() => selectPaymentMethod('Boleto')}>Pagar com Boleto</button>
                                <input type="submit" value="Enviar via WhatsApp" />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span> {/* Botão de fechar */}
                        <p>Envio concluído!</p> {/* Mensagem no modal */}
                    </div>
                </div>
            )}
        </div>
    );
}
