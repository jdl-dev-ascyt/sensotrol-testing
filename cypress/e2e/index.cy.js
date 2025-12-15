describe('example', () => {
    it('redirect vite homepage', () =>{
        cy.visit('/'); 
    });

    it('contains content', () => {
         cy.visit('/');
         cy.contains('Vite + React');
    });
});