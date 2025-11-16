/**
 * Placeholder email service.
 * Replace with SendGrid, SES, or another provider when ready.
 */
export async function sendPasswordResetEmail({ to, token }) {
  // eslint-disable-next-line no-console
  console.log(`Password reset token for ${to}: ${token}`);
  return Promise.resolve();
}






