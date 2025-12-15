// import { v4 as uuid } from 'uuid';

// describe('Product - CRUD', ()=>{
//     beforeEach(()=>{
//         cy.login('admin@sensortrol.com', '123456');
//     });

//     //Casos de uso, que no se crear producto que ya han sido creados con anterioridad en esta parte
//     it('Create product', () => {             
//         cy.visit('/products/create');

//         // General
//         cy.contains('General').click();
//         const unique_value = uuid();
//         const generalValues = [
//             {id: 'sku', input: unique_value, type: 'input'},
//             {id: 'barcode', input: unique_value, type: 'input'},
//             {id: 'sat_code', input: '1010101 - No existe en el catálogo', type: 'dropDown'},
//             {id: 'name', input: 'Producto Pruebas', type: 'input'},
//             {id: 'description', input: 'Descripcion Producto Pruebas', type: 'input'},
//             {id: 'provider_id', input: null, type: 'dropDown'},
//             {id: 'brand_id', input: null, type: 'dropDown'},
//             {id: 'category_id', input: null, type: 'dropDown'},
//             {id: 'measure_unit_id', input: null, type: 'dropDown'},
//             {id: 'international_id', input: 'D2GE71T8GDE', type: 'input'},
//             {id: 'product_type_id', input: null, type: 'dropDown'},
//         ];
//         cy.fillLabels(generalValues);

//         // Precios
//         cy.contains('Precios').click();

//         const pricesValues = [
//             {id: 'purchase_cost', input: 100, type: 'input'},
//             {id: 'currency_id_one', input: 'Dólar', type: 'dropDown'},
//             {id: 'price_list', input: 100, type: 'input'},
//             {id: 'price', input: 100, type: 'input'},
//             {id: 'currency_id_two', input: 'Dólar', type: 'dropDown'},
//             {id: 'tax_type_id', input: 'IVA 16%', type: 'dropDown'},
//         ];
//         cy.fillLabels(pricesValues);

//         cy.contains('Localización').click();
        
//         const locationsValues = [
//             {id: 'warehouse_id', input: 'MTYGRAL', type: 'dropDown'},
//         ];
//         cy.fillLabels(locationsValues);
//         cy.contains('Agregar').click();

//         // Save Product 
//         cy.contains('Guardar').click();
//         cy.contains('Producto creado correctamente').should('be.visible');
//         cy.wait(5000);

//         //verify product created
//         cy.visit('/products');
//         cy.get('tbody tr').eq(0).within(()=>{
//             cy.get('td').eq(0).should('have.text', unique_value);       
//         });
//     });

//     it('Update product', () => {           
//         cy.visit('/products'); 


//         cy.get('[data-row-key]')
//             .first()
//             .invoke('attr', 'data-row-key')
//             .as('productId');


//         cy.get('@productId').then((id) => {
//             cy.visit(`/products/edit/${id}`);

//             const unique_value = uuid();

//             const sections = [
//                 {
//                     name: 'General',
//                     labels: [
//                         {id: 'sku', input: unique_value, type: 'input'},
//                         {id: 'barcode', input: unique_value, type: 'input'},
//                         {id: 'name', input: 'Producto Pruebas Testing (v2)', type: 'input'},
//                         {id: 'description', input: 'Producto Pruebas Testing (v2)', type: 'input'},
//                         {id: 'international_id', input: unique_value, type: 'input'},
//                         {id: 'product_type_id', input: null, type: 'dropDown'},
//                     ]
//                 }, 
//                 {
//                     name: 'Precios',
//                     labels: [
//                         {id: 'purchase_cost', input: '200.0000', type: 'input'},
//                         {id: 'currency_id_one', input: 'Peso mexicano', type: 'dropDown'},
//                         {id: 'price_list', input: '200.0000', type: 'input'},
//                         {id: 'price', input: '200.0000', type: 'input'},
//                         {id: 'currency_id_two', input: 'Peso mexicano', type: 'dropDown'},
//                         {id: 'tax_type_id', input: 'Tasa 0', type: 'dropDown'},
//                     ]
//                 }, 
//                 {
//                     name: 'Localización',
//                     labels: [
//                         {id: 'warehouse_id', input: 'virtual', type: 'dropDown', isStatic: true},
//                     ]
//                 }
//             ];

//             for(const {name, labels} of sections){
//                 cy.contains(name).click();
//                 cy.fillLabels(labels);
//             };   

//             cy.contains('Agregar').click();

//             cy.get('tbody').find('tr').last().find('td').eq(0).then(($el) => {
//                 const text = $el.text().trim();
//                 expect(text).to.equal(sections[2].labels[0].input);
//             });
            
//             cy.contains('Ubicación añadida').should('be.visible');

//             //! Ver que rollo con las actualizaciones de los skus y hacer el reload
//             cy.contains('Actualizar').click();

//             cy.contains('Producto actualizado correctamente.').should('be.visible');
//             for(const {name, labels} of sections){
//                 cy.contains(name).click();
//                 cy.wait(2000);
//                 cy.validateLabels(labels)
//             };

//         });

//     });


// });