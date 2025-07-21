import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ReportService {
  generateCSV(data: any[]): string {
    if (!data || data.length === 0) {
      return '';
    }
    const keys = Object.keys(data[0]);
    const lines = [keys.join(',')];
    for (const item of data) {
      const line = keys
        .map((k) => {
          const val = item[k];
          if (val === null || val === undefined) return '';
          const str = String(val).replace(/"/g, '""');
          return str.includes(',') || str.includes('"') || str.includes('\n')
            ? "${str}"
            : str;
        })
        .join(',');
      lines.push(line);
    }
    return lines.join('\n');
  }

  generatePDF(data: any[]): Buffer {
    const lines: string[] = [];
    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      lines.push(keys.join(' | '));
      for (const item of data) {
        lines.push(keys.map((k) => String(item[k] ?? '')).join(' | '));
      }
    }
    const text = lines.join('\n');

    const objs: string[] = [];
    const offs: number[] = [];
    const header = '%PDF-1.3\n';
    let offset = header.length;

    const add = (o: string) => {
      offs.push(offset);
      objs.push(o);
      offset += Buffer.byteLength(o);
    };

    add('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    add('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
    const stream = BT\n/F1 12 Tf\n72 720 Td\n(${text}) Tj\nET;
    add('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n');
    add(4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n);
    add('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

    const xrefPos = offset;
    let xref = 'xref\n0 6\n0000000000 65535 f \n';
    for (const o of offs) {
      xref += o.toString().padStart(10, '0') + ' 00000 n \n';
    }
    const trailer = trailer\n<< /Root 1 0 R /Size 6 >>\nstartxref\n${xrefPos}\n%%EOF;
    const pdfStr = header + objs.join('') + xref + trailer;
    return Buffer.from(pdfStr, 'binary');
  }

  handleExport(format: string | undefined, name: string, data: any[], res: Response) {
    if (format === 'csv') {
      const csv = this.generateCSV(data);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', attachment; filename=${name}.csv);
      res.send(csv);
      return true;
    }
    if (format === 'pdf') {
      const pdf = this.generatePDF(data);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', attachment; filename=${name}.pdf);
      res.send(pdf);
      return true;
    }
    return false;
  }
}