
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Case } from '../models/case.model';



@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.less']
})
export class CasesComponent implements OnInit {

  timeout: any;
  cases: Case[] = [];
  categoryOptions = ['all work', 'marketing', 'design', 'advertising', 'branding'];
  industryOptions = ['all industries', 'health', 'education', 'travel', 'fashion'];
  selected;
  selectedCategory: Case[] = [];
  selectedIndustry: Case[] = [];
  combinedSearch: Case[] = [];
  displayMode: string;


  combine = (selectedCategory: Case[], selectedIndustry: Case[], combinedFilter = false) =>
    selectedCategory.filter(a => combinedFilter === selectedIndustry.some(b => a.id === b.id));

  inBoth = (selectedCategory: Case[], selectedIndustry: Case[]) =>
    this.combine(selectedCategory, selectedIndustry, true);

  constructor(private dataService: DataService) {
    this.selectedCategory = this.cases;
    this.selectedIndustry = this.cases;
    this.combinedSearch = this.cases;
    this.displayMode = 'grid';
  }

  ngOnInit() {
    this.dataService.getCases().subscribe(resp => {
      for (const data of resp.body) {
        this.cases.push(data);
      }
    });
  }

  onChange(inputEl) {
    inputEl.previousSibling.innerText = inputEl.value;
    inputEl.style.width = inputEl.previousSibling.offsetWidth + 'px';
  }

  onCategorySelect(val: string) {
    if (val == 'all work') {
      this.selectedCategory = this.cases;
    } else {
      this.selectedCategory = this.cases.filter(x => x.category == val);
    }
    this.combinedSearch = this.inBoth(this.selectedCategory, this.selectedIndustry);
  }

  onIndustrySelect(val: string) {
    if (val == 'all industries') {
      this.selectedIndustry = this.cases;
    } else {
      this.selectedIndustry = this.cases.filter(x => x.industry == val);
    }
    this.combinedSearch = this.inBoth(this.selectedCategory, this.selectedIndustry);

  }

  onDisplayModeChange(mode: string): void {
    this.displayMode = mode;
  }

  onCaseImgHover(event): void {
    this.timeout = setTimeout(() => {

      if (!event.target.classList.contains('hover')) {
        event.target.parentElement.className += ' hover';
      }
    }, 150);
  };

  onCaseLeave(event): void {
    event.target.className = event.target.className.replace(' hover', '');
    clearTimeout(this.timeout);
  };
}
