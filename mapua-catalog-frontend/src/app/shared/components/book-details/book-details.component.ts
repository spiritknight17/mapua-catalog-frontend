import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from '../book-card/book-card.component';

export interface BookDetailField {
  label: string;
  type:
    | 'text-small'
    | 'int-small'
    | 'numbers-only-small'
    | 'bool-sep'
    | 'text-field-small'
    | 'multi-big';
  value?: any;
  placeholder?: string;
  required?: boolean;
}

@Component({
  selector: 'app-book-details',
  imports: [CommonModule, FormsModule, BookCardComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  fields: BookDetailField[] = [
    { label: 'ISBN / ISSN', type: 'text-small', value: '', placeholder: 'Enter ISBN or ISSN' },
    {
      label: 'Title No.',
      type: 'text-small',
      value: '',
      required: true,
      placeholder: 'Enter Title No.',
    },
    {
      label: 'Author',
      type: 'multi-big',
      value: { firstName: '', lastName: '' },
      placeholder: 'Enter author name',
    },
    {
      label: 'Collection',
      type: 'text-small',
      value: '',
      required: true,
      placeholder: 'Enter collection',
    },
    {
      label: 'Program',
      type: 'text-small',
      value: '',
      required: true,
      placeholder: 'Enter program',
    },
    { label: 'Call No.', type: 'numbers-only-small', value: '', placeholder: 'Enter call number' },
    { label: 'Year', type: 'int-small', value: '', required: true, placeholder: 'Enter year' },
    { label: 'DR No.', type: 'int-small', value: '', placeholder: 'Enter DR No.' },
    { label: 'Title No.', type: 'int-small', value: '', placeholder: 'Enter Title No.' },
    { label: 'Volume No.', type: 'int-small', value: '', placeholder: 'Enter Volume No.' },
    {
      label: 'Supplier',
      type: 'text-small',
      value: '',
      required: true,
      placeholder: 'Enter supplier',
    },
    {
      label: 'Accession No.',
      type: 'text-small',
      value: '',
      required: true,
      placeholder: 'Enter Accession No.',
    },
    { label: 'Price', type: 'int-small', value: '', placeholder: 'Enter price' },
    { label: 'Date in Alma', type: 'text-small', value: '', placeholder: 'Enter date in Alma' },
    { label: 'Suppress', type: 'bool-sep', value: true }, // No placeholder needed for yes/no buttons
    { label: 'Remarks', type: 'text-field-small', value: '', placeholder: 'Enter remarks if any' },
  ];
  cardFields = [
    { label: 'Title No.', icon: 'title' },
    { label: 'Author', icon: 'person' },
    { label: 'Year', icon: 'calendar_today' },
    { label: 'Collection', icon: 'collections_bookmark' },
    { label: 'Suppress', icon: 'block' },
  ];

  isEditPage = false; // set dynamically depending on page

  getFieldValue(label: string): string {
    if (label === 'Author') {
      const authorField = this.fields.find((f) => f.type === 'multi-big');
      if (!authorField || !authorField.value) return '';
      return `${authorField.value.firstName} ${authorField.value.lastName}`;
    }

    const field = this.fields.find((f) => f.label === label);
    if (!field) return '';
    if (field.type === 'bool-sep') return field.value ? 'Yes' : 'No';
    return field.value ?? '';
  }
  getAuthorName(): string {
    const authorField = this.fields.find((f) => f.type === 'multi-big');
    if (!authorField || !authorField.value) return '';
    return `${authorField.value.firstName} ${authorField.value.lastName}`;
  }
}
