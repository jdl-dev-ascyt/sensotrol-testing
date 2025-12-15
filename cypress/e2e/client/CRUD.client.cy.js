// describe('Client - CRUD', ()=>{
//     beforeEach(()=>{
//         cy.login('admin@sensortrol.com', '123456');
//     });

//     it('Create client', () => {                  
//       cy.visit('/customers/create');

//       const sections = [
//         { 
//           name: 'Datos Fiscales',  
//           labels: [
//             { id: 'tax_name', input: 'Cliente Pruebas Test', type: 'input', search: null },
//             { id: 'capital_regime', input: 'Pruebas', type: 'input', search: null },
//             { id: 'rfc', input: 'XAXX010101000', type: 'input', search: null },
//             { id: 'tax_regime', input: '601 - General de Ley Personas Morales', type: 'dropDown', search: null },
//             { id: 'cfdi', input: 'G01 - Adquisición de mercancias', type: 'dropDown', search: null },
//             { id: 'payment_form', input: '01 - Efectivo', type: 'dropDown', search: null },
//             { id: 'payment_method', input: 'PUE - Pago en una sola exhibición', type: 'dropDown', search: null },
//             { id: 'bank_name', input: 'BBVA', type: 'input', search: null },
//             { id: 'bank_account_name', input: '4048996515731219', type: 'input', search: null },
//             { id: 'bank_code', input: '20807258198798412480', type: 'input', search: null },
//             { id: 'commercial_business_id', input: 'ALMACENES', type: 'dropDown', search: null },
//             { id: 'accountable_type', input: 'Persona física', type: 'dropDown', search: null },
//             { id: 'credit_day_id', input: '7 Días', type: 'dropDown', search: null },
//             { id: 'payment_type', input: 'Crédito', type: 'radio', search: null },
//             { id: 'credit_authorized', input: 'No', type: 'radio', search: null },
//             { id: 'credit_suspended', input: 'No', type: 'radio', search: null },     
//             { id: 'credit_limit', input: '100000', type: 'input', search: null },     
//             { id: 'billing_zipcode', input: '64000', type: 'input', search: null },     
//             { id: 'warehouse_id', input: 'MTYGRAL', type: 'dropDown', search: null }            
//           ] 
//         },
//         {
//           name: 'Contactos',
//           labels: [
//             { id: 'warehouse_contact_name', input: 'Pruebas cliente', type: 'input', search: null },   
//             { id: 'delivery_type', input: 'Ocurre', type: 'radio', search: null },   
//             { id: 'billing_or_order', input: 'no', type: 'radio', search: null },   
//           ]
//         },
//         {
//           name: 'Comisiones',
//           labels: [
//             { id: 'seller_asing', input: 'Juan Pablo Rico', type: 'dropDown', search: null },   
//             // { id: 'team', input: 'COBRANZA', type: 'dropDown', search: null },   
//           ]
//         }
//       ];

//       //Fill labels
//       for(const {name, labels} of sections){
//           cy.get('.ant-tabs-nav-scroll').contains(name).click();
//           cy.fillLabels(labels);
//       };

//       // create user
//       cy.contains('Guardar').click();      
//       cy.wait(5000);

//       // verify label new customer
//       cy.visit('/customers');
//       cy.get('tbody tr').eq(0).within(()=>{
//           cy.get('td').eq(1).should('have.text', 'Cliente Pruebas Test')        
//       });
//     });

//     it('Update client', () => {            
//         cy.visit('/customers');
        
//         //get id firs row [id]
//         cy.get('[data-row-key]')
//         .first()
//         .invoke('attr', 'data-row-key')
//         .as('customerId');

//         cy.get('@customerId').then((id) => {
//             cy.visit(`/customers/edit/${id}`);
//             const labels = [
//               {id: 'customer_status_id', input: 'Activo', type: 'dropDown', search: null},
//               {id: 'tax_name', input: 'Cliente Pruebas Test (Update)', type: 'input', search: null},
//               {id: 'commercial_business_id', input: 'OTROS', type: 'dropDown', search: null},
//               {id: 'warehouse_id', input: 'virtual', type: 'dropDown', search: null},
//               {id: 'payment_type', input: 'Credito', type: 'radio', search: null},
//             ]; 
//             cy.fillLabels(labels);
            
//             //save update
//             cy.contains('Guardar').click();
//             cy.contains('El cliente fue actualizado exitosamente').should('be.visible').then(()=>{
//               cy.validateLabels(labels);
//             });             
//         });

//     });


// });