   //Nas
    const ModalCreateNasContainer = document.getElementById('ModalCreateNasContainer');
    const includeModalCreateNas = async () => {
        const response = await fetch('include/modal_nas/create.html');
        const ModalCreateNasHtml = await response.text();
        ModalCreateNasContainer.innerHTML = ModalCreateNasHtml;
    };
    includeModalCreateNas(); 

    const ModalDeleteNasContainer = document.getElementById('ModalDeleteNasContainer');
    const includeModalDeleteNas = async () => {
        const response = await fetch('include/modal_nas/delete.html');
        const ModalDeleteNasHtml = await response.text();
        ModalDeleteNasContainer.innerHTML = ModalDeleteNasHtml;
    };
    includeModalDeleteNas(); 

    const ModalEditNasContainer = document.getElementById('ModalEditNasContainer');
    const includeModalEditNas = async () => {
        const response = await fetch('include/modal_nas/edit.html');
        const ModalEditNasHtml = await response.text();
        ModalEditNasContainer.innerHTML = ModalEditNasHtml;
    };
    includeModalEditNas(); 
