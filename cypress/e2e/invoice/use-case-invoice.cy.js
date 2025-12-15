// describe('use cases - invoice (invoice_create_type=manual)', () => {
//     const invoiceDefault = {
//         unique_id: null,
//         id: null,
//         products: [
//             {name: null, quantity: 3},
//             {name: null, quantity: 5},
//         ]
//     };

//     // before(() => {
//     //     cy.login('admin@sensortrol.com', '123456');
//     //     cy.createInvoice({products: invoiceDefault.products}).then(({id, unique_id}) => {
//     //         invoiceDefault.id = id;
//     //         invoiceDefault.unique_id = unique_id;
//     //     }); 
//     // });

//     beforeEach(()=>{
//         cy.login('admin@sensortrol.com', '123456');
//     });
    
//     // it('Should show an error when creating a invoice with empty fields', () => {
//     //     cy.visit('/finance/invoice/create?type=manual');
//     //     cy.contains('Guardar').click({force: true});
//     //     cy.contains('Errores en el formulario').should('be.visible');
//     // });
    
//     // it('Should show an error when creating an invoice without selected products', () => {
//     //     cy.visit('/finance/invoice/create?type=manual');
        
//     //     cy.contains('Detalle').click();

//     //     const detailsValues = [
//     //         { id: 'customer_id', input: '1572 - Acsyt Desarollo', type: 'dropDown', search: 'Acsyt Desarollo'},
//     //         { id: 'seller_id', input: null, type: 'dropDown' },
//     //         { id: 'observations', input: 'Generacion de factura ', type: 'textarea' },
//     //         { id: 'paridad', input: 18, type: 'input'},
//     //     ];

//     //     cy.fillLabels(detailsValues);
//     //     cy.wait(2000);

//     //     cy.contains('Guardar').click({force: true});
//     //     cy.contains('Errores en el formulario').should('be.visible');
//     // });
    
//     // // //! QUITAR LA CORRECION DE FLUJO DE LA FUNCION PRINCIPAL PARA LA CREACION DE LA FACTURA...
//     // it('Change currency type USD To MXN', () => { 
//     //     const products = [
//     //         {name: null, quantity: 3},
//     //         {name: null, quantity: 5},
//     //     ];

//     //     cy.createInvoice({ products: products, typeCurrency: 'Dólar' })
//     //         .then(({id, unique_id}) => {
//     //             cy.changeCurrencyInvoice({ invoiceId: id, currency: 'Peso mexicano' })
//     //         });
//     // });

//     // it('Change currency type USD To EUR', () => { 
//     //     const products = [
//     //         {name: null, quantity: 3},
//     //         {name: null, quantity: 5},
//     //     ];

//     //     cy.createInvoice({ products: products, typeCurrency: 'Dólar' })
//     //         .then(({id, unique_id}) => {
//     //             cy.changeCurrencyInvoice({ invoiceId: id, currency: 'Euro' })
//     //         });
//     // });

//     // it('Change currency type MXN To EUR', () => {
//     //     const products = [
//     //         {name: null, quantity: 3},
//     //         {name: null, quantity: 5},
//     //     ];

//     //     cy.createInvoice({products: products, typeCurrency: 'Peso mexicano'})
//     //         .then(({id, unique_id}) => {
//     //             cy.changeCurrencyInvoice({ invoiceId: id, currency: 'Euro' })
//     //         });
//     // });

//     // it('Change currency type MXN To USD', () => {
//     //     const products = [
//     //         {name: null, quantity: 3},
//     //         {name: null, quantity: 5},
//     //     ];

//     //     cy.createInvoice({products: products, typeCurrency: 'Peso mexicano'})
//     //         .then(({id, unique_id}) => {
//     //             cy.changeCurrencyInvoice({ invoiceId: id, currency: 'Dólar' })
//     //         });
//     // });

//     // it('Change currency type EUR To MXN', () => {
//     //     const products = [
//     //         {name: null, quantity: 3},
//     //         {name: null, quantity: 5},
//     //     ];

//     //     cy.createInvoice({products: products, typeCurrency: 'Euro'})
//     //         .then(({id, unique_id}) => {
//     //             cy.changeCurrencyInvoice({ invoiceId: id, currency: 'Peso mexicano'})
//     //         });
//     // });

//     // it('Change currency type EUR To USD', () => {
//     //     const products = [
//     //         {name: null, quantity: 3},
//     //         {name: null, quantity: 5},
//     //     ];

//     //     cy.createInvoice({products: products, typeCurrency: 'Euro'})
//     //         .then(({id, unique_id}) => {
//     //             cy.changeCurrencyInvoice({ invoiceId: id, currency: 'Dólar' })
//     //         });
//     // });

//     // // //! quitar el codigo doble de validacion corespondiente
//     // it('Should create selected product', () => {
//     //     cy.visit(`/finance/invoice/edit/${invoiceDefault.id}`);

//     //     invoiceDefault.products.push({name: null, quantity: 2});
        
//     //     cy.selectValueDropDown('sku', null, null, null, 3).then(() => {
//     //         cy.contains('Agregar').click({force: true});
//     //     });

//     //     //! Remover este codigo seleccionado...
//     //         cy.contains('General').click({ force: true });
//     //         cy.contains('Actualizar datos').click({force: true});
//     //         cy.setValueInput('capital_regime', 'x');

//     //     cy.intercept('PUT', `/api/invoice/${invoiceDefault.id}`).as('updateInvoice');
        
        
//     //     cy.contains('button', 'Actualizar').click({ force: true });

//     //     cy.wait('@updateInvoice').then(({response}) => {
//     //         expect(response.statusCode).to.be.equal(200); 
//     //         cy.reload(true);
//     //         cy.wait(5000);
//     //         cy.get('tbody tr').should('have.length', invoiceDefault.products.length);    
//     //     });
//     // });

//     // //  //! quitar el codigo doble de validacion corespondiente
//     // it('Should update selected product', () => {
//     //     const url = `/finance/invoice/edit/${invoiceDefault.id}`; 
//     //     const newQuantityProduct = invoiceDefault.products[0].quantity + 1; 
//     //     let product_name = '';

//     //     cy.visit(url);

//     //     //En este punto hacer la busqueda del producto actualizado
//     //     cy.get('tbody tr')
//     //         .first()
//     //         .find('td[data-key="sku"]')
//     //         .invoke('text')
//     //         .then((value) => product_name = String(value).trim());

//     //     cy.get('i[aria-label="icon: edit"]').first().click({force: true});
//     //     cy.wait(2000);

//     //     cy.get('input[placeholder="Cantidad"]')
//     //           .clear()
//     //           .type(newQuantityProduct)
//     //           .blur();

//     //     cy.wait(2000);
        
//     //     cy.contains('Agregar').click({force: true});

//     //      //! Remover este codigo seleccionado...
//     //         cy.contains('General').click({ force: true });
//     //         cy.contains('Actualizar datos').click({force: true});
//     //         cy.setValueInput('capital_regime', 'x');
        
//     //     cy.intercept('PUT', `/api/invoice/${invoiceDefault.id}`).as('updateInvoice');       

//     //     cy.contains('button', 'Actualizar').click({ force: true });
        
//     //     cy.wait('@updateInvoice').then(({response}) => {
//     //         expect(response.statusCode).to.be.equal(200); 
//     //         cy.reload(true);
//     //         cy.wait(5000);
//     //         cy.get('td[data-key="sku"]')
//     //             .contains(product_name)
//     //             .parents('tr')
//     //             .then($tr => cy.wrap($tr.index()))
//     //             .then(index => {
//     //                 cy.verifyFirstRowValueByKey(url, [{ key: 'quantity', value: newQuantityProduct}], index);
//     //             });

            
//     //     });
//     // });

//     // // //! quitar el codigo doble de validacion corespondiente
//     // it('Should delete selected product', () => {
//     //     cy.visit(`/finance/invoice/edit/${invoiceDefault.id}`);
                
//     //     invoiceDefault.products.pop();
        
//     //     cy.get('i[aria-label="icon: delete"]').last().click({force: true});

//     //      //! Remover este codigo seleccionado...
//     //         cy.contains('General').click({ force: true });
//     //         cy.contains('Actualizar datos').click({force: true});
//     //         cy.setValueInput('capital_regime', 'x');

//     //     cy.intercept('PUT', `/api/invoice/${invoiceDefault.id}`).as('updateInvoice');       

//     //     cy.contains('button', 'Actualizar').click({ force: true });

//     //     cy.wait('@updateInvoice').then(({response}) => {
//     //         expect(response.statusCode).to.be.equal(200); 
//     //         cy.reload(true);
//     //         cy.wait(5000);
//     //         cy.get('tbody tr').should('have.length', (invoiceDefault.products.length));
//     //     });
//     // });

//     // it("Should not create an invoice if payment form is 'To be defined' and payment method is not PPD", () => {
//     //     const products = [
//     //         {name: null, quantity: 1}
//     //     ];
        
//     //     const generalValues = [
//     //         {id: 'payment_type', input: 'Contado', type: 'dropDown'},
//     //         {id: 'payment_form', input: '99 - Por definir', type: 'dropDown'},
//     //         {id: 'payment_method', input: 'PUE - Pago en una sola exhibición', type: 'dropDown'},
//     //         {id: 'cfdi', input: 'G01 - Adquisición de mercancias', type: 'dropDown'},
//     //         {id: 'tax_regime', input: '616 - Sin obligaciones fiscales', type: 'dropDown'},
//     //     ];

//     //     cy.createInvoice({products: products, generalValues: generalValues}).then(({id, unique_id}) => {
//     //         invoiceDefault.id = id;
//     //         invoiceDefault.unique_id = unique_id;
//     //     });  
//     // });

//     // it("Should not create an invoice if payment form is not 'To be defined' and payment method is PPD", () => {
//     //     const products = [
//     //         {name: null, quantity: 1}
//     //     ];
        
//     //     const generalValues = [
//     //         {id: 'payment_type', input: 'Contado', type: 'dropDown'},
//     //         {id: 'payment_form', input: '01 - Efectivo', type: 'dropDown'},
//     //         {id: 'payment_method', input: 'PPD - Pago en parcialidades o diferido', type: 'dropDown'},
//     //         {id: 'cfdi', input: 'G01 - Adquisición de mercancias', type: 'dropDown'},
//     //         {id: 'tax_regime', input: '616 - Sin obligaciones fiscales', type: 'dropDown'},
//     //     ];

//     //     cy.createInvoice({products: products, generalValues: generalValues}).then(({id, unique_id}) => {
//     //         invoiceDefault.id = id;
//     //         invoiceDefault.unique_id = unique_id;
//     //     });  
//     // });

//     //* Solucionar estas correciones del regimen
//     // it('Should update client data during invoice creation', () => {
//     //     const valuesCurrent = {
//     //         tax_name: '',
//     //         capital_regime: ''
//     //     };
//     //     const valuesUpdate = {
//     //         tax_name: 'tycsa desarrollo',
//     //         capital_regime: 'S.A S.V'
//     //     };

//     //     const detailsValues = [
//     //         { id: 'customer_id', input: '1572 - Acsyt Desarollo', type: 'dropDown', search: 'Acsyt Desarollo'},
//     //         { id: 'seller_id', input: null, type: 'dropDown' },
//     //     ];
        
//     //     const detailsClients = [
//     //         {id: 'tax_name', input: valuesUpdate.tax_name, type: 'input'},
//     //         {id: 'capital_regime', input: valuesUpdate.capital_regime, type: 'input'}
//     //     ];

//     //     cy.visit('/finance/invoice/create?type=manual');
        
//     //     cy.contains('Detalle').click({force: true});
    
//     //     cy.fillLabels(detailsValues);

//     //     cy.selectValueDropDown('sku', null, null, null, 2).then(() => {
//     //         cy.contains('Agregar').click({force: true});
//     //     });

//     //     cy.contains('General').click({force: true});

//     //     for(const {id} of detailsClients){
//     //         cy.get(`#${id}`)           
//     //             .invoke('val')            
//     //             .then((value) => valuesCurrent[id] = value);
//     //     };
        
//     //     cy.contains('Actualizar datos').click({force: true});
//     //     cy.wait(2000);

//     //     cy.fillLabels(detailsClients);

//     //     cy.intercept('POST', '/api/invoice').as('createInvoice');

//     //     cy.contains('Guardar').click({force: true});

//     //     cy.wait('@createInvoice').then(({response}) => {
//     //         const customerId = response?.body?.data?.customer?.id ?? null;
//     //         cy.visit(`/customers/edit/${customerId}`);
//     //         cy.wait(5000);

//     //         cy.validateLabels(detailsClients);
                        
//     //         cy.fillLabels([
//     //             {id: 'tax_name', input: valuesCurrent.tax_name, type: 'input'},
//     //             {id: 'capital_regime', input: valuesCurrent.capital_regime, type: 'input'}
//     //         ]);

//     //         cy.intercept('POST', `/api/customers/${customerId}`).as('updateCustomer');
                
//     //         cy.contains('Guardar').click({force: true});
//     //     });
        
//     //     cy.wait('@updateCustomer').then(({response}) => {
//     //         expect(response.statusCode).to.be.equal(200);
//     //     });

//     // });

//     // it('Should update customer data when stamping invoice', () => {
//     //     let customerNameOriginal = '';
//     //     let customerValueUpdate = 'customer update';
        
//     //     const detailsClients = [
//     //         {id: 'tax_name', input: customerValueUpdate, type: 'input'},
//     //         {id: 'capital_regime', input: customerValueUpdate, type: 'input'}
//     //     ];

//     //     cy.visit(`/finance/invoice/edit/${invoiceDefault.id}`);

//     //     cy.get('#tax_name')          
//     //         .invoke('val')            
//     //         .then((value) => customerNameOriginal = value);
        
//     //     cy.contains('Actualizar datos').click({force: true});
//     //     cy.wait(2000);

//     //     cy.fillLabels(detailsClients);
        
//     //     cy.intercept('PUT', `/invoice/${invoiceDefault.id}`).as('updateInvoice');

//     //     cy.contains('Timbrar').click({force: true});

//     //     cy.wait('@updateInvoice').then(({response}) => {
//     //         const customerId = response?.body?.data?.customer?.id ?? null;
//     //         cy.visit(`/customers/edit/${customerId}`);
//     //         cy.wait(5000);

//     //         cy.validateLabels(detailsClients);
                        
//     //         cy.fillLabels([
//     //             {id: 'tax_name', input: customerNameOriginal, type: 'input'},
//     //             {id: 'capital_regime', input: customerNameOriginal, type: 'input'}
//     //         ]);

//     //         cy.intercept('POST', `/api/customers/${customerId}`).as('updateCustomer');
                
//     //         cy.contains('Guardar').click({force: true});
//     //     });
        
//     //     cy.wait('@updateCustomer').then(({response}) => {
//     //         expect(response.statusCode).to.be.equal(200);
//     //     });
//     // });
// });