import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import JsBarcode from "jsbarcode";

export function generate_lpn_pdf({ pallet, selected_gr }) {
  // Use a smaller custom size or maintain A4 but draw a specific box
  const doc = new jsPDF("p", "pt", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 30;

  // Outer Border for the Label look
  doc.rect(margin, 20, contentWidth, 320);

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
      lineWidth: 1,
      textColor: [0, 0, 0],
      fontSize: 10,
      font: "helvetica",
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
  doc.text(`${pallet.item_desc}`, pageWidth / 2, currentY, { align: "center" });

  doc.setFontSize(12);
  doc.text(
    `PALLET ID :          ${pallet.lpn_no}`,
    pageWidth / 2,
    currentY + 18,
    { align: "center" }
  );

  // 4️⃣ Barcode (Larger to match image)
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, pallet.lpn_no, {
    format: "CODE128",
    height: 100,
    displayValue: false,
    margin: 0,
  });
  const barcodeDataUrl = barcodeCanvas.toDataURL("image/png");
  const barcodeWidth = 300; // Define your desired width
  const xPosition = (pageWidth - barcodeWidth) / 2; // Center it on the page

  doc.addImage(
    barcodeDataUrl,
    "PNG",
    xPosition, // The X coordinate
    currentY + 25, // The Y coordinate
    barcodeWidth, // <--- The Width
    100 // The Height
  );

  // 5️⃣ Bottom Info Table
  // Note: We use rowSpan for the Bin to make it large like the image
  autoTable(doc, {
    startY: currentY + 150,
    margin: { left: margin, right: margin },
    theme: "grid",
    styles: {
      lineColor: [0, 0, 0],
      lineWidth: 1,
      fontSize: 10,
      cellPadding: 5,
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
          styles: {
            fontSize: 18,
            fontStyle: "bold",
            halign: "left",
            valign: "middle",
          },
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

  doc.save(`LPN_${pallet.lpn_no}.pdf`);
}
