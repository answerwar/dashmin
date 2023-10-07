   //usergroup
    const ModalCreateUsergroupsContainer = document.getElementById('ModalCreateUsergroupsContainer');
    const includeModalCreateUsergroups = async () => {
        const response = await fetch('include/modal_usergroups/create.html');
        const ModalCreateUsergroupsHtml = await response.text();
        ModalCreateUsergroupsContainer.innerHTML = ModalCreateUsergroupsHtml;
    };
    includeModalCreateUsergroups(); 

    const ModalDeleteUsergroupsContainer = document.getElementById('ModalDeleteUsergroupsContainer');
    const includeModalDeleteUsergroups = async () => {
        const response = await fetch('include/modal_Usergroups/delete.html');
        const ModalDeleteUsergroupsHtml = await response.text();
        ModalDeleteUsergroupsContainer.innerHTML = ModalDeleteUsergroupsHtml;
    };
    includeModalDeleteUsergroups(); 

    const ModalViewUsergroupsContainer = document.getElementById('ModalViewUsergroupsContainer');
    const includeModalViewUsergroups = async () => {
        const response = await fetch('include/modal_usergroups/view.html');
        const ModalViewUsergroupsHtml = await response.text();
        ModalViewUsergroupsContainer.innerHTML = ModalViewUsergroupsHtml;
    };
    includeModalViewUsergroups(); 

    const ModalEditUsergroupsContainer = document.getElementById('ModalEditUsergroupsContainer');
    const includeModalEditUsergroups = async () => {
        const response = await fetch('include/modal_usergroups/edit.html');
        const ModalEditUsergroupsHtml = await response.text();
        ModalEditUsergroupsContainer.innerHTML = ModalEditUsergroupsHtml;
    };
    includeModalEditUsergroups(); 
