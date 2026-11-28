export interface CommunityPost {
  id: string;
  prompt_key: string;
  body: string;
  created_at: string;
}

export const communityStub = {
  listPosts(): CommunityPost[] {
    return [];
  },

  submitPost(): { accepted: false } {
    return { accepted: false };
  },
};
