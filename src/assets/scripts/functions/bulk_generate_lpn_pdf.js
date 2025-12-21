// assets/scripts/functions/bulk_generate_lpn_pdf.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import JsBarcode from "jsbarcode";

export function bulk_generate_lpn_pdf({ pallets, selected_gr }) {
  const doc = new jsPDF("p", "pt", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  pallets.forEach((pallet, index) => {
    if (index > 0) {
      doc.addPage();
    }

    let currentY = 30;

    // --- BORDER SYNCHRONIZATION ---
    // Set global line width to 1 to match autoTable
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 0); // Pure black

    // Outer Border (Height adjusted to 420 to fit all content)
    doc.rect(margin, 20, contentWidth, 380);

    // 1️⃣ Header
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("MEGASOFT HYGIENIC PRODUCTS, INC.", pageWidth / 2, 40, {
      align: "center",
    });

    // 2️⃣ Top Info Table
    autoTable(doc, {
      startY: 45,
      margin: { left: margin, right: margin },
      theme: "grid",
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 1, // Matches doc.setLineWidth(1)
        fontSize: 10,
        textColor: [0, 0, 0],
      },
      body: [
        [
          {
            content: `INB DO#:  ${selected_gr.gr_number}`,
            styles: { fontStyle: "bold" },
          },
          { content: `GR Date: ${selected_gr.creation_date}` },
        ],
        [
          {
            content: `PO#:  ${selected_gr.po_number}`,
            styles: { fontStyle: "bold" },
          },
          { content: `Pallet Config: ${pallet.pallet_config}` },
        ],
      ],
      columnStyles: {
        0: { cellWidth: contentWidth / 2 },
        1: { cellWidth: contentWidth / 2 },
      },
    });

    currentY = doc.lastAutoTable.finalY + 15;

    // 3️⃣ Item Description & Pallet ID
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${pallet.item_desc}`, pageWidth / 2, currentY, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.text(
      `PALLET ID :          ${pallet.lpn_no}`,
      pageWidth / 2,
      currentY + 18,
      { align: "center" }
    );

    // 4️⃣ Barcode
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, pallet.lpn_no, {
      format: "CODE128",
      height: 100,
      displayValue: false,
      margin: 0,
    });
    const barcodeDataUrl = barcodeCanvas.toDataURL("image/png");
    const barcodeWidth = 300;
    const xPosition = (pageWidth - barcodeWidth) / 2;

    doc.addImage(
      barcodeDataUrl,
      "PNG",
      xPosition,
      currentY + 25,
      barcodeWidth,
      100
    );

    // 5️⃣ Bottom Info Table
    autoTable(doc, {
      startY: currentY + 150,
      margin: { left: margin, right: margin },
      theme: "grid",
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 1, // Matches doc.setLineWidth(1)
        fontSize: 10,
        cellPadding: 5,
        textColor: [0, 0, 0],
      },
      body: [
        [
          { content: `Item Code: ${pallet.item_code}` },
          { content: `SLED: ${pallet.sled_bbd}` },
        ],
        [
          { content: `Batch: ${pallet.batch_code}` },
          {
            content: `Bin:  ${pallet.to_sbin_code || ""}`,
            rowSpan: 2,
            styles: { fontSize: 18, fontStyle: "bold", valign: "middle" },
          },
        ],
        [
          {
            content: `Qty:     ${pallet.quantity}${pallet.uom || ""}    /   ${
              pallet.pallet_config
            }`,
          },
        ],
      ],
      columnStyles: {
        0: { cellWidth: contentWidth / 2 },
        1: { cellWidth: contentWidth / 2 },
      },
    });
  });

  doc.save(`BULK_LPN_${selected_gr.gr_number || "EXPORT"}.pdf`);
}
