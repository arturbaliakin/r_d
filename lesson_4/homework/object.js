const company = {
    name: 'Apple',
    city: 'Cupertino',
    phoneModels:
        ['iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Pro Max'],

    printCompanyInfo() {
        console.log (`Company: ${this.name}, City: ${this.city}`);
        console.log ('');
        console.log ('Relevant Phone Models:');
        this.phoneModels.map((model) => {
            console.log (model);
        });
    }
};

company.printCompanyInfo();
