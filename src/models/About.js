import mongoose from "mongoose";

const MissionSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { _id: false }
);

const GetInTouchSchema = new mongoose.Schema(
  {
    heading: String,
    subHeading: String,
    content: String,
    buttonText: String,
  },
  { _id: false }
);

const AboutSchema = new mongoose.Schema(
  {
    image: {
      url: String,
      publicId: String,
    },

    mainHeading: String,
    introParagraph: String,
    boldText: String,

    paragraphs: [String],

    missionSections: [MissionSchema],

    button: {
      label: String,
      slug: String,
    },

    email: String,

    getInTouch: GetInTouchSchema,
  },
  { timestamps: true }
);

export default mongoose.models.About ||
  mongoose.model("About", AboutSchema);
