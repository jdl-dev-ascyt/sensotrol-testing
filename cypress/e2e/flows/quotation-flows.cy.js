// import { getUniqueId } from '../../helpers/getUniqueId';

// describe('Quotation flows', () => {
//     beforeEach(()=>{
//         cy.login('admin@sensortrol.com', '123456');
//     });
    
//     it('Convert Quote to Requisition', () => {
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
//             cy.createOrder({folio: folio, quotation_id: quotation_id, occ: getUniqueId()}).then((res) =>  {
//                 cy.log('res', res);
//             })
//         });        

//     });
// });