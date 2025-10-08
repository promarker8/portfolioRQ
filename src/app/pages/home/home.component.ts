import { Component, HostListener } from '@angular/core';
import { Home3dEffectComponent } from "../../components/home3d-effect/home3d-effect.component";
import { CommonModule } from '@angular/common';
import TypeIt from 'typeit';
import { SvgMeComponent } from '../../components/svg-me/svg-me.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Home3dEffectComponent, CommonModule, SvgMeComponent, ScrollRevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private typeItInstance: TypeIt | null = null;
  activeTab: 'tab1' | 'tab2' = 'tab1';
  runButtonDisabled = true;
  lines = Array.from({ length: 26 }, (_, i) => i + 1);
  terminalVisible = false;

  showTerminal() {
    this.terminalVisible = true;
  }

  hideTerminal() {
    this.terminalVisible = false;
  }

  toggleSidebar() {
    const explorer = document.getElementById("explorer");
    if (!explorer) return;
    explorer.classList.toggle("hidden");
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent) {
    this.showTerminal();
  }

  openFolders: { [key: string]: boolean } = {
    main: true,
    src: true,
    app: true
  };

  toggleFolder(folderName: string): void {
    this.openFolders[folderName] = !this.openFolders[folderName];
  }

  toggleTabs(activeId: string, inactiveId: string): void {
    this.activeTab = activeId as 'tab1' | 'tab2';

    const active = document.getElementById(activeId);
    const inactive = document.getElementById(inactiveId);

    if (active && inactive) {
      active.classList.add('active');
      inactive.classList.remove('active');
    }

    if (activeId === 'tab1') {
      this.hideTerminal();
      setTimeout(() => this.runIntro(), 0);
    } else {
      this.destroyTypeIt();
      this.runButtonDisabled = false;
    }

    // if (activeId === 'tab2') {
    //   this.runButtonDisabled = false;
    // }
  }

  private destroyTypeIt(): void {
    if (this.typeItInstance) {
      this.typeItInstance.destroy();
      this.typeItInstance = null;

      const codeElement = document.getElementById('codeAnimated');
      if (codeElement) {
        codeElement.innerHTML = '';
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.runIntro());
  }

  runIntro() {
    const codeElement = document.getElementById('codeAnimated');
    if (!codeElement) {
      return;
    }

    this.destroyTypeIt();
    this.runButtonDisabled = true;

    this.typeItInstance = new TypeIt('#codeAnimated', {
      speed: 1,
      cursor: true,
      waitUntilVisible: true,
      html: true,
      afterComplete: () => {
        this.runButtonDisabled = false;
      }
    })
      .pause(800)
      .type(
        '<span class="function">printWelcome</span><span class="keyword">() {</span>'
      )
      .break()
      .type(
        '   <span class="keyword">console</span><span class="function">.log</span>(<span class="string">`Hi! I\'m <span class="keyword">${</span><span class="variable">name</span><span class="keyword">}</span>,</span>'
      )
      .break()
      .type(
        '   <span class="string">and I am currently working as a <span class="keyword">${</span><span class="variable">role</span><span class="keyword">}</span> based in <span class="keyword">${</span><span class="variable">location</span><span class="keyword">}</span>.</span>'
      )
      .break()
      .type(
        '   <span class="string">My main interest at the moment is <span class="keyword">${</span><span class="variable">focus</span><span class="keyword">}</span></span>'
      )
      .break()
      .type(
        '   <span class="string">and much of my work revolves around developing those skills.</span>'
      )
      .break()
      .type(
        '   <span class="string">I hold a <span class="keyword">${</span><span class="variable">education</span><span class="keyword">}</span>, and love weaving <span class="keyword">${</span><span class="variable">hobbies<span class="square-bracket">[</span>2<span class="square-bracket">]</span></span><span class="keyword">}</span> into my personal projects.</span>'
      )
      .break()
      .type(
        '   <span class="string">Lately, I’ve been dipping my toes into <span class="keyword">${</span><span class="variable">hobbies<span class="square-bracket">[</span>3<span class="square-bracket">]</span></span><span class="keyword">}</span>,</span>'
      )
      .break()
      .type(
        '   <span class="string">exploring how design and code can work together in small creative experiments.</span>'
      )
      .break()
      .type(
        '   <span class="string">Have a look around the projects I have undertaken, and feel free to get in contact!`</span>);'
      )
      .break()
      .type(
        '<span class="keyword">}</span>;')
      .go();
  }

}
