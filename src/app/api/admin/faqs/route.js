export const runtime = "nodejs";


import { connectDB } from "@/lib/mongodb";
import FAQModel from "@/models/FAQModel";

// For parsing JSON body in Next.js 13+ route handlers
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const faqs = await FAQModel.find().sort({ createdAt: -1 }).lean();

    const formattedFAQs = faqs.map((faq) => ({
      _id: faq._id.toString(),
      sectionHeading: faq.sectionHeading,
      sectionSubHeading: faq.sectionSubHeading,
      sectionParagraph: faq.sectionParagraph,
      questions: faq.questions.map((q) => ({
        question: q.question,
        answer: q.answer,
      })),
      createdAt: faq.createdAt.toString(),
      updatedAt: faq.updatedAt.toString(),
    }));

    return NextResponse.json(formattedFAQs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    await connectDB();

    const { faqId, questionIndex, question, answer } = await request.json();

    if (!faqId || questionIndex === undefined) {
      return NextResponse.json({ error: "faqId and questionIndex required" }, { status: 400 });
    }

    const faq = await FAQModel.findById(faqId);
    if (!faq) return NextResponse.json({ error: "FAQ not found" }, { status: 404 });

    faq.questions[questionIndex] = { question, answer };
    await faq.save();

    return NextResponse.json({ message: "QA updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update QA" }, { status: 500 });
  }
}



export async function POST(request) {
  try {
    await connectDB();

    const { sectionHeading, sectionSubHeading, sectionParagraph, faqs } =
      await request.json();

    const updatedFAQ = await FAQModel.findOneAndUpdate(
      {}, // 👈 no filter → single global FAQ
      {
        sectionHeading,
        sectionSubHeading,
        sectionParagraph,
        questions: faqs.map(q => ({
          question: q.question,
          answer: q.answer,
        })),
      },
      {
        upsert: true,      // create if not exists
        new: true,
      }
    );

    return NextResponse.json({ message: "FAQ updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save FAQs" },
      { status: 500 }
    );
  }
}


export async function DELETE(request) {
  try {
    await connectDB();

    const { faqId, questionIndex } = await request.json();

    if (!faqId) {
      return NextResponse.json({ error: "faqId is required" }, { status: 400 });
    }

    const faq = await FAQModel.findById(faqId);
    if (!faq) {
      return NextResponse.json({ error: "FAQ section not found" }, { status: 404 });
    }

    if (questionIndex !== undefined) {
      // Delete a single question
      faq.questions.splice(questionIndex, 1);
      await faq.save();
      return NextResponse.json({ message: "Question deleted successfully" });
    } else {
      // Delete entire FAQ section
      await FAQModel.findByIdAndDelete(faqId);
      return NextResponse.json({ message: "FAQ section deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
