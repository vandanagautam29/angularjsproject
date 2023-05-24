
expand_more();
filteredFeature();
showNavBar();
// columnFeatures();
function expand_more() {
    // Get the expanded-row element
    const expandedRow = document.querySelector('.expanded-row');
    const hide = document.querySelectorAll('.hide-rightBodyPane');
    // Get the first child span element with the class "material-symbols-outlined"
    const icon = expandedRow.querySelector('span.material-symbols-outlined');

    // Add a click event listener to the expanded-row element
    expandedRow.addEventListener('click', () => {
    if (icon.textContent === 'chevron_right') {
        icon.textContent = 'expand_more';
        for(let i = 0; i < hide.length; i++) {
            hide[i].style.display = 'flex';
        }
    } else {
        icon.textContent = 'chevron_right';
        for(let i = 0; i < hide.length; i++) {
            hide[i].style.display = 'none';
        }
    }
    });
}
function filteredFeature() {
    const showMenu = document.querySelectorAll('.show-dailog');
    const showHide = document.querySelector('.showEditableMenu');
    const allStories = document.querySelector('.forAllStories');
    const hideFields = document.querySelector('.forHideFields');
    const filter = document.querySelector('.forFilter');
    const group = document.querySelector('.forGroups');
 //   const sort = document.querySelector('.sortings');

    for (let i = 0 ; i < showMenu.length; i++) {
        showMenu[i].addEventListener('click', () => {
            allStories.style.display = 'none';
            hideFields.style.display = 'none';
            filter.style.display = 'none';
            group.style.display = 'none';
       //     sort.style.display = 'none';
            const secondspanvalue  = showMenu[i].querySelectorAll('span')[1].textContent;
            const style = getComputedStyle(showHide)
            if (style.display === 'none') {
                showHide.style.display = 'block';
                switch (secondspanvalue) {
                    case 'All stories':
                        allStories.style.display = 'block';
                        showHide.style.marginLeft = '4rem';
                        showHide.style.width = '15rem';
                        break;
                    case 'Hide fields': 
                        hideFields.style.display = 'block';
                        showHide.style.marginLeft = '12rem';
                        showHide.style.width = '20rem';
                        break;
                    case 'Filter': 
                        filter.style.display = 'block';
                        showHide.style.marginLeft = '22rem';
                        showHide.style.width = '28rem';
                        break;
                    case 'Groups':
                        group.style.display = 'block';
                        showHide.style.marginLeft = '28rem';
                        showHide.style.width = '24rem';
                        break;
                    case 'Sort':
                        // sort.style.display = 'block';
                        // showHide.style.marginxLeft = '34rem';
                       // showHide.style.width = '24rem';
                       
                        break;
                }
            } else {
                showHide.style.display = 'none';
            }
        })
    }
}

function showNavBar() {
    const falag = [];

    const sideNavBarBtn  = document.querySelector('.menuView');
    const navBar = document.querySelector('.viewNavBar');
    
    sideNavBarBtn.addEventListener('click', () => {
        const style = getComputedStyle(navBar);
        if (style.width === '0px') {
            falag.push(1);
            navBar.style.width = '30rem';
            navBar.style.transition = 'width 1s'
        } else {
            falag.length = 0;
            navBar.style.width = '0';
        }
    });
    
    sideNavBarBtn.addEventListener('mouseover', () => {
        navBar.style.width = '30rem';
        navBar.style.transition = 'width 1s'
    })
    sideNavBarBtn.addEventListener('mouseout', () => {
        console.log(falag)
        if(!falag.length) { navBar.style.width = '0';}
    });
    navBar.addEventListener('mousemove', () => {
        navBar.style.width = '30rem';
    });
    navBar.addEventListener('mouseout', () => {
        if(!falag.length) { navBar.style.width = '0';}
    });
}
