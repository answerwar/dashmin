
        //services
    const ModalDeleteServicesContainer = document.getElementById('ModalDeleteServicesContainer');
    const includeModalDeleteServices = async () => {
        const response = await fetch('include/modal_services/delete.html');
        const ModalDeleteServicesHtml = await response.text();
        ModalDeleteServicesContainer.innerHTML = ModalDeleteServicesHtml;
    };
    includeModalDeleteServices(); 

    const ModalCreateServicesContainer = document.getElementById('ModalCreateServicesContainer');
    const includeModalCreateServices = async () => {
        const response = await fetch('include/modal_services/create.html');
        const ModalCreateServicesHtml = await response.text();
        ModalCreateServicesContainer.innerHTML = ModalCreateServicesHtml;
    };
    includeModalCreateServices(); 
    
    const ModalViewServicesContainer = document.getElementById('ModalViewServicesContainer');
    const includeModalViewServices = async () => {
        const response = await fetch('include/modal_services/view.html');
        const ModalViewServicesHtml = await response.text();
        ModalViewServicesContainer.innerHTML = ModalViewServicesHtml;
    };
    includeModalViewServices(); 

    const ModalEditServicesContainer = document.getElementById('ModalEditServicesContainer');
    const includeModalEditServices = async () => {
        const response = await fetch('include/modal_services/edit.html');
        const ModalEditServicesHtml = await response.text();
        ModalEditServicesContainer.innerHTML = ModalEditServicesHtml;
    };
    includeModalEditServices(); 
