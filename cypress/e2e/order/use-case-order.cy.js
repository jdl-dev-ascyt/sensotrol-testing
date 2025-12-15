// import { getUniqueId } from "../../helpers/getUniqueId";

// describe('use cases - order', () => {

//     const orderDefault = {
//         id: 1024,
//         folio: 'REQ/25-27787'
//     };

//     // before(()=>{
//     //     cy.login('admin@sensortrol.com', '123456');
//     //     const products = [
//     //         {
//     //             name: '43780 ICOTEK-KEL-DPZ-E 112/ 7 GREY', 
//     //             profit_porcent: null,
//     //             quantity: 2 
//     //         },      
//     //         {
//     //             name: '39908 ICOTEK-KT 4/5 Insertos pequeños múltiples',
//     //             profit_porcent: null,
//     //             quantity: 2               
//     //         } 
//     //     ];
               
//     //     cy.createQuotation('Normal', products).then(({folio, quotation_id}) => {
//     //         cy.createOrder({folio: folio, quotation_id: quotation_id, occ: getUniqueId()}).then(({id, folio}) => {
//     //             orderDefault.id = id;
//     //             orderDefault.folio = folio;
//     //         });
//     //     });       
//     // });

//     beforeEach(()=>{
//         cy.login('admin@sensortrol.com', '123456');
//     });
    
//     //?En esta parte hacer el cambio de la moneda correspondiente segun el tipo de cambio dado en la info correspondiente
//     //Cambios de moneda con los productos seleccionados y observar si se esan haciendo los cambios correspondientes
//     // it('Change currency type', () => {
//     //     cy.visit(`/orders/edit/${orderDefault.id}`);
         
//     // });

//     it('visit google', () => {
//         // cy.visit('./dashboard');
//         cy.visit('https://www.youtube.com/');
        
//         cy.pause();
//         cy.contains('Try searching to get started');
//         cy.visit('https://www.youtube.com');
//         cy.contains('Busca algo para comenzar');
//     });

//     //Validar que se esten cmabiando los datos del user desde Generel y se hagan el cambio en customer debidamente

//     // .
    
// });