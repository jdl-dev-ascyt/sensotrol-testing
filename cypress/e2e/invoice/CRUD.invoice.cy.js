// describe('CRUD - Invoice', () => {
    
//     const invoiceDefault = {
//         id: null, 
//         unique_id: null
//     };

//     beforeEach(()=>{
//         cy.login('admin@sensortrol.com', '123456');
//     });

//     it('create invoice', () => {
//         const products = [
//             {name: null, quantity: 3},
//             {name: null, quantity: 5},
//         ];

//         cy.createInvoice({ products: products, typeCurrency: 'Dólar' })
//             .then(({id, unique_id}) => {
//                 invoiceDefault.id = id;
//                 invoiceDefault.unique_id = unique_id;
//             });
//     });

//     //! Remover este codigo seleccionado...
//     it('udpate invoice', () =>  {
//         cy.visit(`/finance/invoice/edit/${invoiceDefault.id}`); 

//         const detailsValues = [
//             {id: 'observations', input: 'Generacion de factura (update)', type: 'textarea'}, 
//         ];

//         cy.fillLabels(detailsValues);

//         //! Remover este codigo seleccionado...
//             cy.contains('General').click({ force: true });
//             cy.contains('Actualizar datos').click({force: true});
//             cy.setValueInput('capital_regime', 'x');
        
//         cy.contains('button', 'Actualizar').click({ force: true });
//         cy.reload(true);
//         cy.wait(5000);
        
        
//         cy.validateLabels(detailsValues);        
//     });


// });