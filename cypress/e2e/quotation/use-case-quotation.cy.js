// describe('use cases - quotation', () => {

//     beforeEach(()=>{
//         cy.login('admin@sensortrol.com', '123456');
//     });

//     it('duplicate quotation', () => {
//         const products = [
//             {
//                 name: '43780 ICOTEK-KEL-DPZ-E 112/ 7 GREY', 
//                 profit_porcent: null, 
//                 quantity: null
//             },   
//             {
//                 name: '39908 ICOTEK-KT 4/5 Insertos pequeños múltiples',
//                 profit_porcent: null,
//                 quantity: null                
//             }        
//         ];
        
//         cy.createQuotation('Normal', products).then(({folio, quotation_id}) => {
//             cy.visit(`/quotations/edit/${quotation_id}`);            
//             cy.intercept('POST', `/api/quotations/clone/${quotation_id}`).as('quotation-duplicate')
//             cy.contains('button', 'Clonar').click();
//         });       

//         cy.wait('@quotation-duplicate').then((interception) => {
//             expect(interception.response.statusCode).to.eq(201);
//             cy.contains(`Cotización clonada correctamente con el folio: ${interception.response.body.unique_id}`).should('be.visible');
//             cy.visit('/quotations');  
//             cy.get('tbody tr').eq(0).within(()=>{
//                 cy.get('td').eq(0).should('have.text', interception.response.body.unique_id);        
//             });
//         });
//     });

//     it('Create Quotation with -10% Profit Margin', () => {
//         const products = [
//             {
//                 name: '43780 ICOTEK-KEL-DPZ-E 112/ 7 GREY', 
//                 profit_porcent: 3,
//                 quantity: 2
//             },      
//         ];
        
//         cy.createQuotation('Normal', products);
//     });

//     it('Create Quotation with >= 10% and =< 30% Profit Margin', () => {
//          const products = [
//             {
//                 name: '43780 ICOTEK-KEL-DPZ-E 112/ 7 GREY', 
//                 profit_porcent: 10,
//                 quantity: 40
//             },
//             {
//                 name: '39908 ICOTEK-KT 4/5 Insertos pequeños múltiples',
//                 profit_porcent: null,
//                 quantity: null                
//             }    
//         ];
//         cy.createQuotation('Normal', products);
//     });

//     /*
//         TODO: Casos de uso pendientes 
//         1. Distintos tipos de cotizaciones y sigues otro flujo como tal 
//     */

    
// });