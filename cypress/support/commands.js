import 'cypress-file-upload';
import { getSalesPrice } from '../helpers/getSalePrice';

//* Comandos para manipulacion o validacion de DOM
// Comando de logeo
Cypress.Commands.add('login', (username, password) => {
  cy.session(
    username,
    () => {
      cy.visit('/login');
      cy.get('input[name=email]').type(username);
      cy.get('input[name=password]').type(`${password}{enter}`);
    },
    {
      validate: () => {
        cy.getAllCookies().should('exist')
      },
    },
  )
});

// Comando para abrir dropdown de cypress
Cypress.Commands.add('selectValueDropDown', (id, value, search, actionLastFinish, index = 1) => {
    cy.get(`#${id} .ant-select-selection`).click({ force: true });
  
    // value input the <SearchInput>
    if (search) cy.setValueInput(id, search);
  
    // get option from value
    cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
      .last()
      .within(() => {
        if (value) {
          cy.contains('.ant-select-dropdown-menu-item', value).click({ force: true });
        } else {
          cy.get('.ant-select-dropdown-menu-item').eq(index).click({ force: true });
        }
      })
      .wait(2000);
      if (actionLastFinish) actionLastFinish();  
    return cy.wrap({id: id, value: value});
});

// Comando para rellendo de un for corrpondiente  []{id: 'sku', input: 'D2GE71T8GDE', type: 'input'}
Cypress.Commands.add('fillLabels', (array) => {
    for (const {
 id, input, type, search, 
} of array) {
        if (type === 'input') cy.setValueInput(id, input);
        if (type === 'dropDown') cy.selectValueDropDown(id, input, search);
        if (type === 'textarea') cy.setValueTextarea(id, input);
        if (type === 'radio') cy.radioSelect(id, input)
    }
});

// Comando par validar un grupo de propiedades
Cypress.Commands.add('validateLabels', (array) => {
    for (const {
 id, input, type, isStatic = false, 
} of array) {
        if (!isStatic) {
          if (type === 'input') cy.inputContainsText(id, input);
          if (type === 'dropDown') cy.isSelectedInDropDown(id, input);
          if (type === 'textarea') cy.textareaContainsText(id, input);
          if (type === 'radio') cy.isSelectedRadio(id, input);
        }
    }
});

// Comando para seleccionar el valor de un dropdown
Cypress.Commands.add('isSelectedInDropDown', (id, value) => {
    if (value) {
      cy.get(`#${id}`)
        .find('div.ant-select-selection-selected-value')       
        .invoke('attr', 'title')                      
        .then((title) => {
          expect(title.trim()).to.eq(value);   
        });
    }
    if (!value) {
      cy.get(`#${id}`)
        .find('div[title]')
        .should('have.attr', 'title')
        .and((attr) => {
          expect(attr).to.not.be.empty;
        });
    }
});

// Comando para saber si un input tiene un texto especifico
Cypress.Commands.add('inputContainsText', (id, value) => {
    cy.get(`input#${id}`).should('have.value', value);
});

// COmando para colocar un texto a un input 
Cypress.Commands.add('setValueInput', (id, value) => {
  cy.get(`input#${id}`)
    .should('be.visible')
    .and('not.be.disabled')
    .clear()
    .type(value);
});

// Comando para colocar un texto en un texarea
Cypress.Commands.add('setValueTextarea', (id, value) => {
  cy.get(`textarea#${id}`)
    .should('be.visible')
    .and('not.be.disabled')
    .clear()
    .type(value);
});

// Comando para seleccionar checkBoxList
Cypress.Commands.add('radioSelect', (id, value) => {
  // Normalizar texto para evitar problemas con acentos y espacios
  function normalize(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }
  const target = normalize(value);

  cy.get(`#${id} label`).filter((i, label) => {
    // Buscar si el span con el texto buscado existe dentro del label
    const spanText = Array.from(label.querySelectorAll('span'))
      .map((s) => normalize(s.innerText))
      .find((t) => t === target);

    return spanText === target;
  })
  .find('input[type="radio"]')
  .parents('.ant-radio') // Sube al wrapper que Ant Design usa para clicks
  .click({ force: true });
});

// Comando para determinar si ese checked es seleccionado
Cypress.Commands.add('isSelectedRadio', (id, value) => {
  function normalize(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }
  const target = normalize(value);

  cy.get(`#${id} label`).filter((i, label) => {
    const spanText = Array.from(label.querySelectorAll('span'))
      .map((s) => normalize(s.innerText))
      .find((t) => t === target);
    return spanText === target;
  })
  .find('input[type="radio"]')
  .should('be.checked');
});

// Comando para verificar si un textArea tiene cierto contenido  
Cypress.Commands.add('textareaContainsText', (id, value) => {
    cy.get(`#${id}`).should('have.value', value);
});

// Comando para verificar que una row fue agregada en una columna
Cypress.Commands.add('verifyFirstRowValueByKey', (path, elements, positionIndex = 0) => {
  cy.visit(path);
  
  cy.get('tbody tr')
  .eq(positionIndex)
  .within(() => {
    elements.forEach(({ key, value }) => {
      cy.get(`td[data-key="${key}"]`)
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.eq(String(value));
        });
    });
  });
});

//* Funciones sobre casos de uso
Cypress.Commands.add('createQuotation', (type_quotation = 'Normal', productsList) => {
      /*
          Estructura de productList: [
            {
                name: '43780 ICOTEK-KEL-DPZ-E 112/ 7 GREY', 
                profit_porcent: 30 //porcentaje de utilidad con el que se estara generando esa partida,
                quantity: 2 //cantidad por partida
            }      
          ]
      */
      let folio;
      let status;
      cy.visit('/quotations/create');

      // get folio
      cy.get('input#unique_id').invoke('val').as('unique_id');

      cy.get('@unique_id').wait(5000).then((unique_id) => {
            folio = unique_id;
            const valuesLabels = [{ id: 'paridad', input: '018.00', type: 'input' },
                { id: 'customer_id', input: '1572 - Acsyt Desarollo', type: 'dropDown', search: 'Acsyt Desarollo' },
                { id: 'quotation_type_id', input: type_quotation, type: 'dropDown' },
                { id: 'attention', input: 'Pruebas quoatation', type: 'textarea' },
                { id: 'description', input: 'Pruebas quoatation', type: 'textarea' }];            
            cy.fillLabels(valuesLabels);
            cy.get('button').contains('Agregar').as('button-add');

            // add products
            for (const [index, { name, profit_porcent, quantity = 1 }] of productsList.entries()) {
              cy.selectValueDropDown('sku', name ?? null, name ?? null, () => {
                if (profit_porcent) {
                    if (profit_porcent < 3 && !status) status = 'Cancelada';
                    if ((profit_porcent >= 3 && profit_porcent < 30) && !status) status = 'Pendiente de aprobar por admin';
                    cy.get('input#price_list').invoke('val').then((value) => {
                      const price_sale = getSalesPrice(value, profit_porcent);
                      cy.setValueInput('quantity', quantity);
                      cy.wait(1000);
                      cy.setValueInput('price_sale', price_sale);
                      cy.wait(1000);
                      cy.get('input#price_sale').invoke('val').then((priceSaleValue) => {
                          const amount = (quantity) ? (quantity * priceSaleValue) : priceSaleValue;
                          cy.get('input#amount').invoke('val').then((value) => {
                            if (Number(amount).toFixed(4) === Number(value).toFixed(4)) cy.get('@button-add').click({ force: true });  
                          });
                      });
                    });   
                }
                if (!profit_porcent && quantity) {
                    cy.setValueInput('quantity', quantity);
                    cy.wait(1000);
                    cy.get('@button-add').click({ force: true });
                }
                if (!profit_porcent && !quantity) cy.get('@button-add').click({ force: true });
              }, index + 1);
            }
            
            // validate products add 
            cy.get('tbody tr').should('have.length', productsList.length);

            // catch response
            cy.intercept('POST', '/api/quotations').as('quotation-create');

            //Save quotation 
            cy.contains('button', 'Guardar').click();            
      });

      cy.wait('@quotation-create').then((interception) => {
        console.log('response: ', interception);
        expect(interception.response.statusCode).to.eq(201);

        //Verify status created
        cy.visit(`/quotations/show/${interception.response.body.id}`);
        cy.wait(5000);
        cy.isSelectedInDropDown('status', status ?? 'Pendiente'); 

        cy.verifyFirstRowValueByKey('/quotations', [
          {key: 'unique_id', value: folio }
        ]);
        return cy.wrap({ folio, quotation_id: interception.response.body.id });
      });
});

// Comando para creacion de requisicion basdo en una cotizacion previamente creada
Cypress.Commands.add('createOrder', ({ folio, quotation_id, occ }) => { 
      
        const order = {
          id: null, 
          folio: null,
        };

        cy.visit(`/quotations/edit/${quotation_id}`);     
        cy.intercept('PUT', `/api/quotations/${quotation_id}`).as('quotation-update');
        cy.contains('button', 'Aprobar').click();
    
        cy.wait('@quotation-update').then(() => {
            cy.contains('Cotización fue actualizada correctamente.').should('be.visible');
            cy.intercept('GET', `/api/quotations/validate-occ/${occ}`).as('quotation-validate-occ');
            cy.get('input#customer_purchase_order').clear().type(occ).blur()
        });
    
        cy.wait('@quotation-validate-occ').then((interception) => {   
            expect(interception.response.statusCode).to.eq(200);
            cy.get('input[type="file"]').attachFile('pdf_example.pdf');            
            cy.get('label.ant-checkbox-wrapper').should('not.have.class', 'ant-checkbox-wrapper-disabled');
            cy.get('input.ant-checkbox-input').should('not.be.disabled');
            cy.get('thead tr').first().find('label.ant-checkbox-wrapper').click();
            cy.intercept('PUT', `/api/quotations/${quotation_id}`).as('quotation-update-requested');
            cy.contains('button', 'Solicitar').click()      
        });
        
        cy.wait('@quotation-update-requested').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            order.folio = response.body.order_unique_id;
            cy.contains(`Orden creada con el folio ${response.body.order_unique_id}`);
            cy.verifyFirstRowValueByKey('/orders', [{ key: 'unique_id', value: response.body.order_unique_id }, 
              { key: 'humanizedStatus', value: 'Pendiente de confirmación de pago' }]);
            cy.get('i[aria-label="icon: check"]').first().parent().click({ force: true });
            cy.intercept('PUT', '/api/orders/changed/status/*').as('changeStatus');            
            cy.get('button').contains('OK').click({ force: true });
            cy.contains('El estatus fue actualizado correctamente.').should('be.visible');
            cy.verifyFirstRowValueByKey('/orders', [{ key: 'humanizedStatus', value: 'Pago confirmado' }]);            
          });
          
          cy.wait('@changeStatus').then(({ request, response }) => {
            const match = request.url.match(/(\d+)$/);
            order.id = match[1];
            return cy.wrap(order);
          });
});

//Invoices
// Comando para la creacion de una factura...
Cypress.Commands.add('createInvoice', ({ products, generalValues, typeCurrency }) => {
    /*
        Estructura products
        //name: Puede ponerse el name para seleecionarlo o buscarlo, si no se le pasa nada toma por defualte el del index
        //Aquantity sera la cantidad de productos seleccionados por cada partida
        [
            {name: '', quantity: 1}, // 
            {name: '', quantity: 10}, /
        ]
    */
    const invoice = {
      id: null,
      uniqueId: null
    };  
        
    cy.visit('/finance/invoice/create?type=manual');

    cy.contains('Detalle').click();

    const detailsValues = [
      { id: 'customer_id', input: '1572 - Acsyt Desarollo', type: 'dropDown', search: 'Acsyt Desarollo'},
      { id: 'seller_id', input: null, type: 'dropDown' },
      { id: 'observations', input: 'Generacion de factura ', type: 'textarea' },
      { id: 'paridad', input: 18, type: 'input'},
    ];

    if(typeCurrency) detailsValues.push({ id: 'currency_id', input: typeCurrency, type: 'dropDown' });

    cy.fillLabels(detailsValues);

    for (const [index, { quantity = 1 }] of products.entries()) {
          cy.selectValueDropDown('sku', null, null, () => {
            cy.get('input[placeholder="Cantidad"]')
              .clear()
              .type(quantity)
              .blur();            
            cy.wait(2000);
            cy.contains('Agregar').click({ force: true });
          }, index + 1);
    };
    
    if(generalValues?.length > 0){
      cy.contains('General').click({ force: true });
      cy.wait(2000);
      cy.fillLabels(generalValues);
      const paymentForm = generalValues.find(item => item.id === 'payment_form');
      const paymentMethod = generalValues.find(item => item.id === 'payment_method');
      
      if (paymentForm && paymentMethod) {
        const isUndefinedForm = paymentForm.input === '99 - Por definir';
        const isPUE = paymentMethod.input === 'PPD - Pago en parcialidades o diferido';
        
        if ((isUndefinedForm && !isPUE) || (!isUndefinedForm && isPUE)){
          cy.contains('Guardar').click({force: true});
          cy.contains('Errores en el formulario').should('be.visible');
          return cy.wrap({id: null, unique_id: null});
        };
      };
    };
    
    //TODO: QUITAR ESTAS VALIDACIONES...
        cy.contains('General').click({ force: true });
        cy.wait(2000);

        cy.contains('Actualizar datos').click({force: true});

        cy.setValueInput('capital_regime', 'Pruebitas por fines practicos');
    //TODO: QUITAR 

    cy.intercept('POST','/api/invoice').as('createInvoice');

    cy.contains('Guardar').click({force: true});
    
    cy.wait('@createInvoice').then(({response})=>{
      expect(response.statusCode).to.eq(201);
      invoice.id = response.body.data.id;
      invoice.uniqueId = response.body.data.unique_id;
      cy.visit('/finance/invoice'); 
      cy.wait(2000);   
      cy.contains('Generadas').click({force: true});
      cy.verifyFirstRowValueByKey('/finance/invoice', [{ key: 'unique_id', value: response.body.data.unique_id }]);     
      return cy.wrap({id: invoice.id, unique_id: invoice.uniqueId});
    });
});

//Comando para el cambio de moneda de una factura
Cypress.Commands.add('changeCurrencyInvoice', ({ invoiceId, currency }) => { 
      cy.visit(`/finance/invoice/edit/${invoiceId}`);
      cy.wait(3000);

      const values = [];
      let valuesNew = [];

      cy.get('div[id^="total_"]').each(($el) => {
        cy.wrap($el)
          .invoke('text')
          .then((text) => {
              const [_, value] = text.split(' ');
              values.push(value);
          });
      })
      .then(()=>{
              const newValues = [];
              cy.selectValueDropDown('currency_id', currency);
              cy.wait(2000);
              cy.get('div[id^="total_"]').each(($el) => {
                  cy.wrap($el)
                      .invoke('text')
                      .then((text) => {
                          const [_, value] = text.split(' ');
                          newValues.push(value);
                      });
              });
              cy.wrap({ oldValues: values, newValues: newValues });
      })
      .then(({ oldValues, newValues }) =>  {
          valuesNew = newValues;
          expect(oldValues).to.not.deep.equal(newValues);       
          cy.wait(5000);
          cy.intercept('GET', `/api/invoice/${invoiceId}`).as('getInvoice');
          cy.intercept('PUT', `/api/invoice/${invoiceId}`).as('updateInvoice');
      
           //TODO: QUITAR ESTAS VALIDACIONES...
              cy.contains('General').click({ force: true });

              cy.contains('Actualizar datos').click({force: true});
              
              cy.setValueInput('capital_regime', 'x');
          //TODO: QUITAR 

          cy.contains('button', 'Actualizar').click({ force: true });
      });        

      cy.wait('@updateInvoice').then(({response}) => {
          expect(response.statusCode).to.eq(200);
      });
        
      cy.wait('@getInvoice').then(({response}) =>  {
          expect(response.statusCode).to.eq(200);
          cy.contains('Factura actualizada exitosamente.').should('be.visible');
          return cy.wrap({id: invoiceId, values: valuesNew});     
      });

});