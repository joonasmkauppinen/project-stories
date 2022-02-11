/**
 * Temporary translations utility to keep track of sentences that need to be
 * properly translated.
 */

const TRANSLATIONS = {
  layers: 'Layers',
  buttonLabelAddCard: 'Add card',
  buttonLabelPublish: 'Publish',
  buttonLabelPreview: 'Preview',
  popoverMenuPreviewTogglePreview: 'Toggle preview',
  popoverMenuPreviewOpenToNewWindow: 'Open to new window',
  iconButtonTitleMove: 'Move',
  iconButtonTitleText: 'Text',
  iconButtonTitleHand: 'Hand',
  iconButtonTitleAddImage: 'AddImage',
  iconButtonTitlePublishHistory: 'Publish history',
  iconButtonTitleSettings: 'Settings',
};

type TranslationKey = keyof typeof TRANSLATIONS;

export const t = (key: TranslationKey) => {
  return TRANSLATIONS[key];
};
