import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  prevScrollpos = window.pageYOffset;
  navbarVisible = true;

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('nav');
      if(navbar){
        const currentScrollPos = window.pageYOffset;
      if (this.prevScrollpos > currentScrollPos) {
        this.navbarVisible = true;
        navbar.style.display = 'block';
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.marginTop = '-30px';
        /* Add any other styles you want */
      }

      else {
        this.navbarVisible = true;
        navbar.style.display = 'none';
      }
      if (currentScrollPos === 0) {
        navbar.style.marginTop = '0px';
        navbar.style.backgroundColor ='#F8F9FA';

      }
      this.prevScrollpos = currentScrollPos;
      }
    });
}
}

